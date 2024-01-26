const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function add_user() {
    const user = await prisma.user.createMany({
        data: [{
            email: 'sharifulislam.9876@gmail.com',
            password: '123456',
            name: 'Shariful Islam',
            DOB: new Date('1998-12-12').toISOString(),
            picture : 'https://i.ibb.co/0jZQY7F/IMG-20201212-123456.jpg',
        },
        {
            email: 'asibrahmanbarbie.233@gmail.com',
            password: '123456',
            name: 'Asib Rahman',
            DOB: new Date('1998-12-12').toISOString(),
            picture : 'https://i.ibb.co/0jZQY7F/IMG-20201212-123456.jpg',
        }]
    })

}

// add_user()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })


async function add_author() {
    const author = await prisma.author.createMany({
        data: [{
            user_id: 1
        },
        {
            user_id: 2
        }]
    })
}

// add_author()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function add_course_type() {
    const course_type = await prisma.course_type.createMany({
        data: [{
            name: 'Algebra'
        },
        {
            name: 'Arithmetic'
        }]
    })
}

// add_course_type()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function add_course() {
    const course = await prisma.course.createMany({
        data: [{
            level: 'Beginner',
            type_id: 1
        },
        {
            level: 'Intermediate',
            type_id: 1
        },
        {
            level: 'Beginner',
            type_id: 2
        }]
    })
}

// add_course()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })


async function add_language() {
    const language = await prisma.language.createMany({
        data: [{
            name: 'English'
        },
        {
            name: 'Bangla'
        }]
    })
}

// add_language()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function add_course_content(){
    const course_content = await prisma.course_content.createMany({
        data: [
        {
        name: 'Algebra I',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        course_id: 1,
        language_id: 1,
    },
    {
        name: 'Algebra II',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        course_id: 2,
        language_id: 1,
    },
    {
        name: 'Fractions',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        course_id: 3,
        language_id: 1,
    }]
    })
}

// add_course_content()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })


async function add_prerequisite(){
    const prerequisite = await prisma.prerequisite_course.createMany({
        data: [{
            course_id: 2,
            prerequisite_id: 1
        }]
    })
}

// add_prerequisite()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })


async function add_topic(){
    const topic = await prisma.topic.createMany({
        data: [
            {
                course_id: 1,

            },
            {
                course_id: 1,

            },
            
        ]
    })
}

// add_topic()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function add_topic_content(){
    const topic_content = await prisma.topic_content.createMany({
        data: [
            {
                name: 'Topic 1',
                topic_id: 1,
                language_id: 1,
            },
            {
                name: 'Topic 2',
                topic_id: 2,
                language_id: 1,
            }
            
        ]
    })
}

// add_topic_content()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function add_abstraciton_level(){
    const abstraction_level = await prisma.abstraction_level.createMany({
        data: [
            {
                name: 'Novice',
            },
            {
                name: 'Intermediate',
            },
            {
                name: 'Expert',
            }
            
        ]
    })
}

// add_abstraciton_level()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function add_lesson(){
    const lesson = await prisma.lesson.createMany({
        data: [
            {
                topic_id : 1,
                XP     : 100,
            },
            {
                topic_id : 1,
                XP     : 80,
            },
            {
                topic_id : 1,
                XP     : 100,
            }
            ,
            {
                topic_id : 2,
                XP     : 50,
            },
            {
                topic_id : 2,
                XP     : 80,
            },
            {
                topic_id : 2,
                XP     : 50,
            }
            
        ]
    })
}

// add_lesson()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function add_lesson_content(){
    const lesson_content = await prisma.lesson_content.createMany({
        data: [
            {
                lesson_id : 1,
                name      : 'Lesson 1',
                language_id : 1,
                abstraction_level_id : 1,
                content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            }
            
        ]
    })
}

// add_lesson_content()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function add_definition(){
    const definition = await prisma.definition.createMany({
        data: [
            {
                name : 'linear',
                content : 'In mathematics, a linear function is a polynomial function of degree one. It has the form y = mx + b, where m is the slope and b is the y-intercept.',
                language_id : 1,
            },
            {
                name : 'slope',
                content : 'In mathematics, slope refers to the steepness or incline of a line. It represents the ratio of the vertical change (rise) to the horizontal change (run) between two points on the line.',
                language_id : 1,
            }
            
        ]
    })
}

// add_definition()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function add_quiz(){
    const quiz = await prisma.quiz.createMany({
        data: [
            {
                topic_id : 1,
                XP       : 100,
            }
            
        ]
    })
}   

// add_quiz()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })  

async function add_quiz_content(){
    const quiz_content = await prisma.quiz_content.createMany({
        data: [
            {
                quiz_id : 1,
                content : 'Quiz is a form of game or mind sport, attempt to answer questions correctly.',
                language_id : 1,
            }
            
        ]
    })
}   

// add_quiz_content()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function add_lesson_author(){
    const lesson_author = await prisma.lesson_author.createMany({
        data: [
            {
                author_id : 1,
                lesson_id : 1,
                language_id : 1,
                abstraction_level_id : 1,
            },
            {
                author_id : 2,
                lesson_id : 1,
                language_id : 1,
                abstraction_level_id : 1,
            }
            
        ]
    })
}
async function seed_data() {
    try {
        await add_user();
        await add_author();
        await add_course_type();
        await add_course();
        await add_language();
        await add_course_content();
        await add_prerequisite();
        await add_topic();
        await add_topic_content();
        await add_abstraciton_level();
        await add_lesson();
        await add_lesson_content();
        await add_definition();
        await add_quiz();
        await add_quiz_content();
        await add_lesson_author();
    } catch (error) {
        console.error(error);
    }
}

seed_data()