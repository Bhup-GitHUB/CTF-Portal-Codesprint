package utils

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var Secret = []byte("CodeSprintCTF2026")

func GenerateTeamToken(teamID string) (string, error) {
	claims := jwt.MapClaims{
		"teamID": teamID,
		"exp":    time.Now().Add(24 * time.Hour).Unix(), // event lifetime
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(Secret)
}
