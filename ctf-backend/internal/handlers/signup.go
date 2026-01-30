package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"ctf-backend/internal/services"
)

type SignupRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func Signup(c *gin.Context) {
	var req SignupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid body"})
		return
	}

	memberID, err := services.Signup(services.SignupRequest(req))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"memberId": memberID,
	})
}
