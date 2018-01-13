var User = require('../models/user');
var Story = require('../models/story');
var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
    var token = jsonwebtoken.sign({
        id: user._id,
        name: user.name,
        username: user.username
    },secretKey,{
        expiresIn : 60*60*24
        //expirtesInMinute: 1440
    });
    return token;
}

module.exports = function(app,express){
    var api = express.Router();
    // 注册
    api.post('/signup',function(req,res){
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        user.save(function(err){
            if(err){
                res.send(err);
                return;
            }
            res.json({message:'用户已经生成！'});
        });
    });
    // 获取全部用户信息
    api.get('/users',function(req,res){
        User.find({},function(err,users){
            if(err){
                res.send(err);
                return;
            }
            res.json(users);
        });
    });
    // 登录
    api.post('/login',function(req,res) {
        User.findOne({
            username: req.body.username
        }).select('password').exec(function(err,user){
            if(err) throw err;
            if(!user){
                res.send({message: '用户不存在'});
            }else if(user){
                var vaildPassword = user.comparePassword(req.body.password);
                if(!vaildPassword){
                    res.send({message: '密码验证无效'});
                }else{
                    // token
                    var token = createToken(user);
                    res.json({
                        success: true,
                        message: '登录成功！',
                        token: token
                    });
                }
            }
        });
    });

    api.use(function(req,res,next){
        console.log('Somebody just came to our app!');
        //检查post的信息或者url查询参数或者头信息
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        //var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        //检验token是否存在
        if(token){
            jsonwebtoken.verify(token, secretKey, function(err, decoded) {
                if(err){
                    res.status(403).send({success:false,message:'认证用户失败！'});
                }else{
                    req.decoded = decoded; // 解码
                    next();
                }
            });
        }else{
            res.status(403).send({success:false,message: '未提供Token'});
        }
    });

    // Destination B // provide a legitimate token
    /*
    api.get('/',function(req,res){
        res.json('Hello World');
    });
    */
    api.route('/').post(function(req,res){
        var story = new Story({
            creator: req.decoded.id,
            content: req.body.content
        });
        story.save(function(err){
            if(err){
                res.send(err);
                return;
            }
            res.json({
                message: '新故事生成！'
            });
        });
    }).get(function(req,res){
        Story.find({ creator: req.decoded.id },function(err,stories){
            if(err){
                res.send(err);
                return;
            }
            res.json(stories);
        });
    });
    api.get('/me', function(req, res) {
		res.send(req.decoded);
	});
    return api;
};