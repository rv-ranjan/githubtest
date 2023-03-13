var express = require('express');
var app = new express();
const http = require('http');
const swagger = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition: swagger.Options = {
        openapi: '3.0.0',
        info: {
            title: 'Node Js Swagger Demo',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:4000/'
            }
        ]
    },
    apis: ['./app.js']
}

const swaggerSpec = swagger(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

// mongoose.Promise = global.Promise;

/**
 * @swagger
 * /:
 *  get:
 *      summary : Get Method Testing Api.
 *      description: Test Get Method.
 *      responses: 
 *          200:
 *              description:to test get Method
 */

app.get('/', (req, res) => {
    try {
        res.send('Test get api')
    } catch (e) {
        res.send(e.stack);
    }
})

/**
 * @swagger
 * /getIpData:
 *  get:
 *      summary : Get Ip Address Info.
 *      description: Get Ip Address Info.
 *      responses: 
 *          200:
 *              description:to test get Method
 */

app.get('/getIpData/:city?/:state?', (req, res) => {
    http.get('http://ipapi.co/json', (data) => {
        try {
            if (data) {
                // console.log('data',JSON.stringify(data))
                res.json({ 'Status': 'Success', 'Data': JSON.stringify(data) });
            }
            else {
                res.json({ 'Msg': 'Fail' })
            }
        } catch (e) {
            res.json({ 'Status': 'Fail', 'Msg': e.stack })
        }
    })
});

/**
 * @swagger
 * /getRtoData:
 *  get:
 *      summary : Get RTO Info.
 *      description: Get RTO Info.
 *      responses: 
 *          200:
 *              description:to test get Method
 */

app.get('/getRtoData', (req, res) => {
    http.get('http://qa-horizon.policyboss.com:3000/vehicles/getrto/', (data) => {
        if (data) {
            res.json({ 'RtoData': JSON.stringify(data) });
        }
    })
});

/**
 * @swagger
 * /submitDetails:
 *  post:
 *      summary : Submit Student Details.
 *      description: Post Student Info.
 *      responses: 
 *          200:
 *              description:to test get Method
 */

app.post('/submitDetails', (req, res) => {
    let objReq = req.body;
    let myDbObj = {
        'Id': Number,
        'Name': String,
        'Stream': String,
        'Gender': String
    };
    // let {Name : StudentName, Id :StudentId , Stream : studentStream,Gender : studentGender} = objReq;
    let { Name, Id, Stream, Gender } = objReq;
    // myDbObj.Id = StudentId;
    // myDbObj.Name = StudentName;
    // myDbObj.Stream = studentStream;
    // myDbObj.Gender = studentGender;
    myDbObj.Id = Id;
    myDbObj.Name = Name;
    myDbObj.Stream = Stream;
    myDbObj.Gender = Gender;
    let myDb;
    myDb.save(myDbObj, (resp, error) => {
        if (error) {

        } else {

        }
    })
});

/**
 * @swagger
 * /showStudent:
 *  get:
 *      summary : Get Student Info.
 *      description: Get Student Info.
 *      responses: 
 *          200:
 *              description:to test get Method
 */

app.get('/showStudent/:id?/:name?',(req,res)=>{

})

app.listen(4000, () => {
    console.log('running on port 3000');
});

module.export = app;