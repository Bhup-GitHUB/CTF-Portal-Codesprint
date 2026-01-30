package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"ctf-backend/internal/services"
)

type JoinTeamRequest struct {
	Pin        string `json:"pin"`
	MemberName string `json:"memberName"`
}

func JoinTeam(c *gin.Context) {
	var req JoinTeamRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid body"})
		return
	}

	token, err := services.JoinTeam(req.Pin, req.MemberName)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"teamToken": token})
}
