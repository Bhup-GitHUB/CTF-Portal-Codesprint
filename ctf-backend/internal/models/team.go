package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Team struct {
	ID               primitive.ObjectID `bson:"_id,omitempty"`

	// Core identity
	TeamName string `bson:"teamName"`
	EventID  string `bson:"eventID"`

	// Auth & access
	Password string `bson:"password"` // hashed
	Pin      string `bson:"pin"`      // join code
	Token    string `bson:"token"`    // team JWT (optional to store)

	// Members & progress
	Members          []string `bson:"members"`
	Score            int      `bson:"score"`
	SolvedChallenges []string `bson:"solvedChallenges"`

	// Metadata
	CreatedAt time.Time `bson:"createdAt"`
}
