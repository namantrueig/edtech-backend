const userSchema = {
    type: "object",
    properties: {
        id: { type: "integer", minimum: 1 },
        name: { type: "string", minLength: 3 },
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 },
        role: { type: "string", enum: ["admin", "student", "instructor"] },
        courseId: { 
            type: "string", 
            format: "uuid", 
            nullable: true 
        } // Nullable, only for students
    },
    required: ["name", "email", "password", "role"],
    additionalProperties: false,
};

export default userSchema;
