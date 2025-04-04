const setupCollections = (db) => {
    const officialDrinks = db
        .createCollection("officialDrinks", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["name", "sizes"],
                    properties: {
                        name: {
                            bsonType: "string",
                            minLength: 1,
                            description: "The name of the official drink.",
                        },
                        sizes: {
                            bsonType: "object",
                            required: ["tall", "grande", "venti"],
                            properties: {
                                tall: {
                                    bsonType: "array",
                                    items: {
                                        bsonType: "object",
                                        required: ["name", "amount"],
                                        properties: {
                                            name: { bsonType: "string" },
                                            amount: {
                                                bsonType: "int",
                                                minimum: 1,
                                            },
                                        },
                                    },
                                },
                                grande: {
                                    bsonType: "array",
                                    items: {
                                        bsonType: "object",
                                        required: ["name", "amount"],
                                        properties: {
                                            name: { bsonType: "string" },
                                            amount: {
                                                bsonType: "int",
                                                minimum: 1,
                                            },
                                        },
                                    },
                                },
                                venti: {
                                    bsonType: "array",
                                    items: {
                                        bsonType: "object",
                                        required: ["name", "amount"],
                                        properties: {
                                            name: { bsonType: "string" },
                                            amount: {
                                                bsonType: "int",
                                                minimum: 1,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        .catch((err) => {
            console.dir(err, { depth: null });
        });

    const customizedDrinks = db
        .createCollection("customizedDrinks", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: [
                        "name",
                        "size",
                        "ingredients",
                        "clicks",
                        "userName",
                    ],
                    properties: {
                        name: {
                            bsonType: "string",
                            minLength: 1,
                            description: "The name of the customized drink.",
                        },
                        size: {
                            bsonType: "string",
                            enum: ["Tall", "Grande", "Venti"],
                            description:
                                "The size of the drink (tall, grande, venti)",
                        },
                        ingredients: {
                            bsonType: "array",
                            minItems: 1,
                            items: {
                                bsonType: "object",
                                required: ["name", "amount"],
                                properties: {
                                    name: { bsonType: "string" },
                                    amount: { bsonType: "int", minimum: 1 },
                                },
                            },
                        },
                        clicks: {
                            bsonType: "int",
                            minimum: 0,
                            description:
                                "Number of times the drink was clicked (for popularity)",
                        },
                        userName: {
                            bsonType: "string",
                            minLength: 1,
                            description: "NAme of the creator of the drink.",
                        },
                    },
                },
            },
        })
        .catch((err) => {
            console.dir(err, { depth: null });
        });

    return Promise.all([officialDrinks, customizedDrinks]);
};

export default setupCollections;
