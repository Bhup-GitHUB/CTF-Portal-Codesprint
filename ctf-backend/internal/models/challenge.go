package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)


type Challenge struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Code        string             `bson:"code" json:"code"`          // used in submit
	Title       string             `bson:"title" json:"title"`
	Description string             `bson:"description" json:"description"`

	Link        string             `bson:"link,omitempty" json:"link,omitempty"` // 🔗
	Level       string             `bson:"level" json:"level"`                    // child / parent / papa

	Points      int                `bson:"points" json:"points"`
	Answer      string             `bson:"answer" json:"-"`          // NEVER expose
	IsActive    bool               `bson:"isActive" json:"isActive"`

	StartTime   time.Time          `bson:"startTime" json:"startTime"`
	EndTime     time.Time          `bson:"endTime" json:"endTime"`
}
