package services

import (
	
	"errors"
	"fmt"
	"math/rand"
	"time"
	"github.com/golang-jwt/jwt/v5"

	"ctf-backend/internal/db"
	"ctf-backend/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CreateTeamRequest struct {
	TeamName string
	Password string
	MemberID string
}

/* =======================
   HELPERS
======================= */

func Hash(p string) string {
	// TODO: replace with bcrypt
	return fmt.Sprintf("hashed:%s", p)
}

func GeneratePin() string {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	return fmt.Sprintf("%06d", r.Intn(1000000))
}

func GenerateTeamToken(teamID string) (string, error) {
	claims := jwt.MapClaims{
		"teamID": teamID,
		"exp":    time.Now().Add(48 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte("CodeSprintCTF2026"))
}

/* =======================
   CREATE TEAM
======================= */

func CreateTeam(req CreateTeamRequest) (string, string, error) {
	ctx, cancel := db.Ctx()
	defer cancel()

	// prevent duplicate team name
	count, err := db.Collection("team").CountDocuments(ctx, bson.M{
		"teamName": req.TeamName,
	})
	if err != nil {
		return "", "", err
	}
	if count > 0 {
		return "", "", errors.New("team already exists")
	}

	pin := GeneratePin()
	teamID := primitive.NewObjectID()

	// 🔐 generate token FIRST
	token, err := GenerateTeamToken(
		teamID.Hex(),
	)
	if err != nil {
		return "", "", err
	}

	team := models.Team{
		ID:               teamID,
		TeamName:         req.TeamName,
		EventID:          "ctf-2026",
		Password:         Hash(req.Password),
		Pin:              pin,
		Token:            token,              // ✅ STORED
		Members:          []string{req.MemberID},
		Score:            0,
		SolvedChallenges: []string{},
		CreatedAt:        time.Now(),
	}

	_, err = db.Collection("team").InsertOne(ctx, team)
	if err != nil {
		return "", "", err
	}

	return token, pin, nil
}


/* =======================
   JOIN TEAM USING PIN
======================= */

func JoinTeam(pin, memberID string) (string, error) {
	ctx, cancel := db.Ctx()
	defer cancel()

	var team models.Team
	err := db.Collection("team").FindOne(ctx, bson.M{"pin": pin}).Decode(&team)
	if err != nil {
		return "", errors.New("invalid team pin")
	}

	// prevent duplicate member
	for _, m := range team.Members {
		if m == memberID {
			return "", errors.New("member already in team")
		}
	}

	_, err = db.Collection("team").UpdateOne(
		ctx,
		bson.M{"_id": team.ID},
		bson.M{"$push": bson.M{"members": memberID}},
	)
	if err != nil {
		return "", err
	}

	token, err := GenerateTeamToken(
		team.ID.Hex(),
	)
	if err != nil {
		return "", err
	}

	return token, nil
}

/* =======================
   LOGIN TEAM
======================= */

func LoginTeam(memberName, teamName string) (string, error) {
	ctx, cancel := db.Ctx()
	defer cancel()

	var team models.Team

	err := db.Collection("team").FindOne(ctx, bson.M{
		"teamName": teamName,
	}).Decode(&team)
	if err != nil {
		return "", errors.New("team not found")
	}

	token, _ := GenerateTeamToken(
		team.ID.Hex(),
	)

	return token, nil
}
// services/team_service.go
func GetTeamDetails(teamID string) (*models.Team, error) {
	ctx, cancel := db.Ctx()
	defer cancel()

	tid, err := primitive.ObjectIDFromHex(teamID)
	if err != nil {
		return nil, errors.New("invalid team id")
	}

	var team models.Team
	err = db.Collection("team").FindOne(ctx, bson.M{
		"_id": tid,
	}).Decode(&team)

	if err != nil {
		return nil, errors.New("team not found")
	}

	return &team, nil
}


