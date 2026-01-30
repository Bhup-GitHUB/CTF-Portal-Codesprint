package services

import (

	"ctf-backend/internal/db"
	"ctf-backend/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetLeaderboard() ([]models.Team, error) {
	ctx, cancel := db.Ctx()
	defer cancel()

	opts := options.Find().SetSort(bson.D{{Key: "score", Value: -1}})

	cursor, err := db.Collection("team").Find(ctx, bson.M{}, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var teams []models.Team
	if err := cursor.All(ctx, &teams); err != nil {
		return nil, err
	}

	return teams, nil
}
