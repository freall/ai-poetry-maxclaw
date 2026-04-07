#!/usr/bin/env python3
"""Generate all poetry data as JSON files."""
import json, os
OUT = '/workspace/poetry-master/frontend/src/data'
os.makedirs(OUT, exist_ok=True)

AUTHORS = []
POEMS = []
QUIZZES = []

def A(id, name, nickname, dynasty, bio, birth=None, death=None):
    AUTHORS.append({"id":id,"name":name,"nickname":nickname,"dynasty":dynasty,
                    "birthYear":birth,"deathYear":death,"bio":bio,
                    "representativeWorks":[],"portraitUrl":""})

def poem(id, title, author, author_id, dynasty, cat, diff, content,
         translation, annotation="", background="", tags=None,
         source="", sl="", stb="", theme=None):
    POEMS.append({
        "id":id,"title":title,"author":author,"authorId":author_id,
        "dynasty":dynasty,"category":cat,"difficulty":diff,
        "content":content,"translation":translation,
        "annotation":annotation,"background":background,
        "tags":tags or [],"source":source,"schoolLevel":sl,
        "schoolTextbook":stb,"theme":theme or [],
        "relatedPoemIds":[],
        "aiImagePrompt":("古风水墨画：%(title)s %(author)s，朦胧山水，云雾缭绕" % locals()),
        "aiImageUrl":"","historicalPaintings":[],"calligraphyUrls":[],"quizIds":[]
    })

def q(id, poem_id, question, options, answer, explanation, qtype="choice"):
    QUIZZES.append({"id":id,"poemId":poem_id,"question":question,
                    "options":options,"answer":answer,
                    "explanation":explanation,"type":qtype})

# Authors
authors_data = [
    ("libai","李白","青莲居士","Tang","李白（701-762），字太白，号青莲居士，唐代伟大的浪漫主义诗人，被誉为诗仙。",701,762),
    ("dufu","杜甫","少陵野老","Tang","杜甫（712-770），字子美，唐代现实主义诗人，与李白合称李杜，其诗被称为诗史。",712,770),
    ("wangwei","王维","摩诘居士","Tang","王维（699-761），字摩诘，唐代山水田园派诗人。",699,761),
    ("menghaoran","孟浩然","孟山人","Tang","孟浩然（689-740），唐代山水田园派先驱诗人。",689,740),
    ("wangzhihuan","王之涣","王季凌","Tang","王之涣（688-742），盛唐边塞诗人。",688,742),
    ("wangchangling","王昌龄","王少伯","Tang","王昌龄，盛唐边塞诗人，被称为七绝圣手。",698,756),
    ("lishen","李绅","李进士","Tang","李绅，《悯农》作者。",772,846),
    ("cuihao","崔颢","崔司户","Tang","崔颢，《黄鹤楼》被誉为唐人七律之首。",704,754),
    ("zhangji","张继","张员外","Tang","张继，《枫桥夜泊》作者。",715,779),
    ("mengjiao","孟郊","孟东野","Tang","孟郊，以苦吟著称。",751,814),
    ("li_shangyin","李商隐","玉溪生","Tang","李商隐（813-858），晚唐杰出诗人，无题诗著称于世。",813,858),
    ("du_mu","杜牧","杜樊川","Tang","杜牧（803-852），晚唐杰出诗人，与李商隐并称小李杜。",803,852),
    ("han_yu","韩愈","韩昌黎","Tang","韩愈（768-824），唐代文学家，唐宋八大家之首。",768,824),
    ("liu_yuxi","刘禹锡","刘宾客","Tang","刘禹锡（772-842），唐代文学家、诗人。",772,842),
    ("liu_zongyuan","柳宗元","柳河东","Tang","柳宗元（773-819），唐代文学家，唐宋八大家之一。",773,819),
    ("bai_juyi","白居易","香山居士","Tang","白居易（772-846），唐代伟大的现实主义诗人。",772,846),
    ("wei_yingwu","韦应物","韦苏州","Tang","韦应物（737-792），以山水田园诗见长。",737,792),
    ("lu_lun","卢纶","卢允言","Tang","卢纶（739-799），大历十才子之一。",739,799),
    ("jia_dao","贾岛","贾浪仙","Tang","贾岛（779-843），以苦吟著称。",779,843),
    ("zhang_zhihe","张志和","张子同","Tang","张志和，唐代诗人，《渔歌子》作者。",None,None),
    ("xu_hui","许浑","许丁卯","Tang","许浑，晚唐诗人。",None,None),
    ("xue_tao","薛涛","薛校书","Tang","薛涛（768-832），唐代女诗人。",768,832),
    ("yu_xuanji","鱼玄机","鱼幼微","Tang","鱼玄机（844-871），唐代女诗人。",844,871),
    ("liuchangqing","刘长卿","刘文房","Tang","刘长卿，唐代诗人。",None,None),
    ("sushi","苏轼","东坡居士","Song","苏轼（1037-1101），字子瞻，号东坡居士，北宋文学家，豪放派代表。",1037,1101),
    ("xinqiji","辛弃疾","稼轩居士","Song","辛弃疾（1140-1207），字幼安，号稼轩，南宋豪放派词人。",1140,1207),
    ("liqingzhao","李清照","易安居士","Song","李清照（1084-约1155），号易安居士，宋代最杰出的女词人。",1084,1155),
    ("yuefei","岳飞","岳鹏举","Song","岳飞（1103-1142），字鹏举，南宋抗金名将。",1103,1142),
    ("luyou","陆游","放翁","Song","陆游（1125-1210），字务观，号放翁，南宋爱国诗人。",1125,1210),
    ("liyu","李煜","莲峰居士","Song","李煜（937-978），字重光，南唐后主，工词。",937,978),
    ("liuyong","柳永","奉旨填词","Song","柳永（984-1053），北宋婉约派代表词人。",984,1053),
    ("yanshu","晏殊","晏元献","Song","晏殊（991-1055），字同叔，北宋婉约派词人。",991,1055),
    ("ouyangxiu","欧阳修","醉翁","Song","欧阳修（1007-1072），字永叔，号醉翁，唐宋八大家之一。",1007,1072),
    ("wanganshi","王安石","临川先生","Song","王安石（1021-1086），字介甫，唐宋八大家之一。",1021,1086),
    ("fanzhongyan","范仲淹","范文正","Song","范仲淹（989-1052），字希文，北宋政治家、文学家。",989,1052),
    ("qin_guan","秦观","淮海居士","Song","秦观（1049-1100），字少游，北宋婉约派词人。",1049,1100),
    ("zhou_bangyan","周邦彦","清真居士","Song","周邦彦（1056-1121），字美成，北宋婉约派集大成者。",1056,1121),
    ("yanjidao","晏几道","小山","Song","晏几道（1038-1110），字叔原，号小山，北宋婉约派词人。",1038,1110),
    ("huang_tingjian","黄庭坚","山谷道人","Song","黄庭坚（1045-1105），字鲁直，号山谷道人，北宋诗人。",1045,1105),
    ("su_zhe","苏辙","颍滨遗老","Song","苏辙（1039-1112），字子由，号颍滨遗老，唐宋八大家之一。",1039,1112),
    ("zeng_gong","曾巩","南丰先生","Song","曾巩（1019-1083），字子固，号南丰先生，唐宋八大家之一。",1019,1083),
    ("jiang_kui","姜夔","白石道人","Song","姜夔（1154-1221），字尧章，号白石道人，南宋词人。",1154,1221),
    ("wen_tianxiang","文天祥","文文山","Song","文天祥（1236-1283），字履善，号文山，南宋抗元名臣。",1236,1283),
    ("mengzi","孟子","孟轲","Pre-Qin","孟子（约前372-前289），名轲，战国时期思想家，儒家学派代表人物。",-372,-289),
    ("zhuangzi","庄子","庄周","Pre-Qin","庄子（约前369-前286），名周，战国时期道家代表人物。",-369,-286),
    ("shiji","司马迁","太史公","Han","司马迁（前145-前86），字子长，西汉史学家，《史记》作者。",-145,-86),
    ("zhuge","诸葛亮","卧龙","Han","诸葛亮（181-234），字孔明，三国时期蜀汉政治家、军事家。",181,234),
    ("li_mi","李密","陈情表","Jin","李密（224-287），字令伯，西晋官员。",224,287),
    ("taoyuanming","陶渊明","五柳先生","Jin","陶渊明（365-427），名潜，字元亮，东晋诗人，田园诗派开创者。",365,427),
    ("wangxizhi","王羲之","书圣","Jin","王羲之（303-361），字逸少，东晋书法家，《兰亭集序》作者。",303,361),
]
for x in authors_data:
    if len(x) == 4:
        A(x[0],x[1],x[2],x[3],x[4])
    else:
        A(x[0],x[1],x[2],x[3],x[4],x[5],x[6])

print("Authors: %d" % len(AUTHORS))
