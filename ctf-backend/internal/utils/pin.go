package utils

import "math/rand"

const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

func GeneratePin() string {
	b := make([]byte, 5)
	for i := range b {
		b[i] = charset[rand.Intn(len(charset))]
	}
	return string(b)
}
