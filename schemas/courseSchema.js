const courseSchema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
        title: { type: "string", minLength: 5 },
        price: { type: "integer", minimum: 0, nullable: true },
        description: { type: "string", nullable: true },
        instructorId: { type: "string", format: "uuid" },
        categoryId: { type: "string", format: "uuid" }
    },
    required: ["title", "instructorId", "categoryId"],
    additionalProperties: false,
};

export default courseSchema;
