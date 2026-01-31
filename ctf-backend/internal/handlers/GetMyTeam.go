// handlers/team.go
package handlers

import (
	"ctf-backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMyTeam(c *gin.Context) {
	teamID := c.GetString("teamID")

	team, err := services.GetTeamDetails(teamID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"teamName": team.TeamName,
		"members":  team.Members,
		"score":    team.Score,
	})
}
