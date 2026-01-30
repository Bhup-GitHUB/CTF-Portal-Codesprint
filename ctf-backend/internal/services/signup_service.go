package services

import (
	"errors"
	"time"

	"ctf-backend/internal/db"
	"ctf-backend/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SignupRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func Signup(req SignupRequest) (string, error) {
	ctx, cancel := db.Ctx()
	defer cancel()

	// prevent duplicate email
	count, err := db.Collection("members").CountDocuments(ctx, bson.M{
		"email": req.Email,
	})
	if err != nil {
		return "", err
	}

	if count > 0 {
		return "", errors.New("email already registered")
	}

	member := models.Member{
		Name:      req.Name,
		Email:     req.Email,
		CreatedAt: time.Now(),
	}

	res, err := db.Collection("members").InsertOne(ctx, member)
	if err != nil {
		return "", err
	}

	memberID := res.InsertedID.(primitive.ObjectID).Hex()
	return memberID, nil
}
