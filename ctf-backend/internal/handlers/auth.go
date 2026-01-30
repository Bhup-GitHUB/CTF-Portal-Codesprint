package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"ctf-backend/internal/services"
)

type LoginTeamRequest struct {
	MemberName string `json:"memberName"`
	TeamName   string `json:"teamName"`
}

func LoginTeamHandler(c *gin.Context) {
	var req LoginTeamRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request body",
		})
		return
	}

	if req.TeamName == "" || req.MemberName == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "teamName and memberName are required",
		})
		return
	}

	token, err := services.LoginTeam(req.MemberName, req.TeamName)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}
