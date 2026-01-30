package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"ctf-backend/internal/services"
)

func Leaderboard(c *gin.Context) {
	teams, err := services.GetLeaderboard()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to fetch leaderboard",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"leaderboard": teams,
	})
}
