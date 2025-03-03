const ratingSchema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
        studentId: { type: "string", format: "uuid" },
        courseId: { type: "string", format: "uuid" },
        rating: { type: "integer", minimum: 1, maximum: 5 },
        comment: { type: "string", nullable: true }
    },
    required: ["studentId", "courseId", "rating"],
    additionalProperties: false,
};

export default ratingSchema;
