package services
import (
	"context"
	"errors"
	"log"
	"strings"
	"time"

	"ctf-backend/internal/db"
	"ctf-backend/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var EventEnd = time.Date(2026, 1, 31, 18, 0, 0, 0, time.UTC)

func SubmitChallenge(teamID string, code string, answer string) (map[string]interface{}, error) {

    log.Println("---- SUBMIT CHALLENGE START ----")
    log.Println("TeamID:", teamID)
    log.Println("Challenge Code:", code)
    log.Println("Answer:", answer)

    tid, err := primitive.ObjectIDFromHex(teamID)
    if err != nil {
        return nil, errors.New("invalid team id")
    }

    var team models.Team
    if err := db.Collection("team").FindOne(
        context.TODO(),
        bson.M{"_id": tid},
    ).Decode(&team); err != nil {
        return nil, errors.New("team not found")
    }

    for _, solved := range team.SolvedChallenges {
        if solved == code {
            return map[string]interface{}{
                "message": "already solved",
                "score":   team.Score,
            }, nil
        }
    }

    var challenge models.Challenge
    if err := db.Collection("challenge").FindOne(
        context.TODO(),
        bson.M{"code": code, "isActive": true},
    ).Decode(&challenge); err != nil {
        log.Println("❌ Challenge not found:", err)
        return nil, errors.New("invalid challenge")
    }

    log.Println("DB FLAG:", challenge.Answer)
    log.Println("USER FLAG:", strings.TrimSpace(answer))

    if strings.TrimSpace(answer) != challenge.Answer {
        return map[string]interface{}{"correct": false}, nil
    }

    _, err = db.Collection("team").UpdateOne(
        context.TODO(),
        bson.M{"_id": tid},
        bson.M{
            "$inc":  bson.M{"score": challenge.Points},
            "$push": bson.M{"solved_challenges": code},
        },
    )
    if err != nil {
        return nil, errors.New("update failed")
    }

    return map[string]interface{}{
        "correct": true,
        "points":  challenge.Points,
        "score":   team.Score + challenge.Points,
    }, nil
}

func GetAllChallenges() ([]models.Challenge, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := db.Collection("challenges").Find(ctx, bson.M{
		"isActive": true,
	})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var challenges []models.Challenge
	if err := cursor.All(ctx, &challenges); err != nil {
		return nil, err
	}

	return challenges, nil
}