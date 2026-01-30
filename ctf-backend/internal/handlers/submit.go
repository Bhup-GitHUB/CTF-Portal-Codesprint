package handlers

import (
	"log"
	"net/http"

	"ctf-backend/internal/services"

	"github.com/gin-gonic/gin"
)

func Submit(c *gin.Context) {
	var req struct {
		Code    string `json:"challenge_id"`
		Answer    string `json:"answer"`
	}
	log.Fatal("code of the challenge : %s",req.Code);
	log.Fatal("answer of the challenge : %s",req.Answer);

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	teamID := c.GetString("teamID")

	result, err := services.SubmitChallenge(teamID, req.Code, req.Answer)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, result)
}
