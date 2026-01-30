package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"ctf-backend/internal/services"
)

type CreateTeamRequest struct {
	TeamName string `json:"teamName"`
	Password string `json:"password"`
	MemberID string `json:"memberID"` // ✅ MUST be exported (capital M)
}

func CreateTeam(c *gin.Context) {
	var req CreateTeamRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request body",
		})
		return
	}

	// convert handler request to service request type
	svcReq := services.CreateTeamRequest{
		TeamName: req.TeamName,
		Password: req.Password,
		MemberID: req.MemberID,
	}

	token, pin, err := services.CreateTeam(svcReq)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"teamToken": token,
		"pin":       pin,
	})
}
