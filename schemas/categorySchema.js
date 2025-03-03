const categorySchema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string", minLength: 3 },
        description: { type: "string", nullable: true }
    },
    required: ["name"],
    additionalProperties: false,
};

export default categorySchema;
