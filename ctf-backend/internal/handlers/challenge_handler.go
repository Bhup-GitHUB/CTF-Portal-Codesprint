package handlers

import (
	"net/http"
	"log"

	"github.com/gin-gonic/gin"
	"ctf-backend/internal/services"
)

type SubmitChallengeRequest struct {
	Code   string `json:"code"`
	Answer string `json:"answer"`
}

func SubmitChallengeHandler(c *gin.Context) {
	teamID := c.GetString("teamID") // 👈 from JWT middleware
	log.Println("Team ID:", teamID)

	var req SubmitChallengeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	log.Printf("Looking for challenge with code: %s", req.Code)
	result, err := services.SubmitChallenge(teamID, req.Code, req.Answer)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, result)
}

func GetChallenges(c *gin.Context) {
	challenges, err := services.GetAllChallenges()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to fetch challenges",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"challenges": challenges,
	})
}
