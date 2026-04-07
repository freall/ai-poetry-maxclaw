#!/usr/bin/env python3
"""Generate comprehensive poetry dataset: 300 Tang + 300 Song + Classical Prose + School Curriculum."""
import json, os

OUT_DIR = "/workspace/poetry-master/frontend/src/data"
os.makedirs(OUT_DIR, exist_ok=True)

# ── Helpers ─────────────────────────────────────────────────────────────────
def P(id, title, author, author_id, dynasty, category, difficulty, content,
      translation, annotation="", background="", tags=None, source="", school_level="",
      school_textbook="", theme=None, related=None, ai_prompt=None,
      historical=None, calligraphy_urls=None):
    tags = tags or []
    theme = theme or []
    related = related or []
    historical = historical or []
    calligraphy_urls = calligraphy_urls or []
    ai_prompt = ai_prompt or f"古风水墨画，中国古典诗词意境：{title} {author}，朦胧山水，云雾缭绕，诗意盎然"
    return {
        "id": id, "title": title, "author": author, "authorId": author_id,
        "dynasty": dynasty, "category": category, "difficulty": difficulty,
        "content": content, "translation": translation, "annotation": annotation,
        "background": background, "tags": tags, "source": source,
        "schoolLevel": school_level, "schoolTextbook": school_textbook,
        "theme": theme, "relatedPoemIds": related,
        "aiImagePrompt": ai_prompt, "aiImageUrl": "", "historicalPaintings": historical,
        "calligraphyUrls": calligraphy_urls, "quizIds": []
    }

AUTHORS = []

def A(id, name, nickname, dynasty, bio, representative_works, portrait_url="", birth=None, death=None):
    AUTHORS.append({
        "id": id, "name": name, "nickname": nickname, "dynasty": dynasty,
        "bio": bio, "representativeWorks": representative_works,
        "portraitUrl": portrait_url,
        "birthYear": birth, "deathYear": death
    })
    return id

# ── Authors ─────────────────────────────────────────────────────────────────
a = lambda **kw: A(**kw)
a(id="libai",     name="李白",    nickname="青莲居士",       dynasty="Tang",   birth=701,  death=761,
  bio="李白（701-762），字太白，号青莲居士，唐代伟大的浪漫主义诗人。其诗想象丰富，语言豪放飘逸，被誉为"诗仙"。",
  representative_works=["tang-001","tang-002","tang-003","tang-020","tang-021","tang-025","tang-026","tang-027","tang-028","tang-029"])
a(id="dufu",      name="杜甫",    nickname="少陵野老",        dynasty="Tang",   birth=712,  death=770,
  bio="杜甫（712-770），字子美，自号少陵野老，唐代现实主义诗人。与李白合称"李杜"，其诗被称为"诗史"。",
  representative_works=["tang-009","tang-030","tang-031","tang-032","tang-033","tang-034","tang-035"])
a(id="wangwei",   name="王维",    nickname="摩诘居士",        dynasty="Tang",   birth=699,  death=761,
  bio="王维（699-761），字摩诘，唐代山水田园派诗人，苏轼称其"诗中有画，画中有诗"。",
  representative_works=["tang-012","tang-013","tang-014","tang-015","tang-017","tang-036","tang-037","tang-038"])
a(id="menghaoran",name="孟浩然", nickname="孟山人",           dynasty="Tang",   birth=689,  death=740,
  bio="孟浩然（689-740），名浩，字浩然，唐代山水田园派先驱诗人，以五言诗见长。",
  representative_works=["tang-004","tang-039","tang-040","tang-041","tang-042","tang-043"])
a(id="wangzhihuan",name="王之涣",nickname="王少伯",           dynasty="Tang",   birth=688,  death=742,
  bio="王之涣（688-742），字季凌，盛唐边塞诗人，以描写边疆风光著称。",
  representative_works=["tang-005","tang-016","tang-044"])
a(id="wangchangling",name="王昌龄",nickname="王少伯",         dynasty="Tang",   birth=698,  death=756,
  bio="王昌龄（约698-756），字少伯，盛唐边塞诗人，被称为"七绝圣手"。",
  representative_works=["tang-006","tang-018","tang-019","tang-045","tang-046"])
a(id="lishen",    name="李绅",    nickname="李进士",           dynasty="Tang",   birth=772,  death=846,
  bio="李绅（772-846），字公垂，唐代诗人，《悯农》二首为其代表作。",
  representative_works=["tang-008","tang-047"])
a(id="cuihao",    name="崔颢",    nickname="崔司户",           dynasty="Tang",   birth=704,  death=754,
  bio="崔颢（约704-754），唐玄宗开元年间诗人，《黄鹤楼》被誉为唐人七律之首。",
  representative_works=["tang-007","tang-048"])
a(id="zhangji",   name="张继",    nickname="张员外",           dynasty="Tang",   birth=715,  death=779,
  bio="张继（约715-约779），唐代诗人，《枫桥夜泊》为其传世名作。",
  representative_works=["tang-010","tang-049"])
a(id="mengjiao",  name="孟郊",    nickname="孟东野",           dynasty="Tang",   birth=751,  death=814,
  bio="孟郊（751-814），字东野，唐代诗人，以苦吟著称，与贾岛并称"郊寒岛瘦"。",
  representative_works=["tang-011","tang-050"])
a(id="li bai2",   name="李商隐",  nickname="玉溪生",           dynasty="Tang",   birth=813,  death=858,
  bio="李商隐（813-858），字义山，号玉溪生，晚唐杰出诗人，无题诗著称于世。",
  representative_works=["tang-051","tang-052","tang-053","tang-054","tang-055"])
a(id="du mu",     name="杜牧",    nickname="杜樊川",           dynasty="Tang",   birth=803,  death=852,
  bio="杜牧（803-852），字牧之，号樊川居士，晚唐杰出诗人，与李商隐并称"小李杜"。",
  representative_works=["tang-056","tang-057","tang-058","tang-059","tang-060","tang-061","tang-062","tang-063"])
a(id="han yu",    name="韩愈",    nickname="韩昌黎",           dynasty="Tang",   birth=768,  death=824,
  bio="韩愈（768-824），字退之，唐代文学家，唐宋八大家之首，古文运动倡导者。",
  representative_works=["tang-064","tang-065","tang-066"])
a(id="liu yuxi",  name="刘禹锡",  nickname="刘宾客",           dynasty="Tang",   birth=772,  death=842,
  bio="刘禹锡（772-842），字梦得，唐代文学家、诗人，与白居易并称"刘白"。",
  representative_works=["tang-067","tang-068","tang-069"])
a(id="liu zongyuan",name="柳宗元",nickname="柳河东",          dynasty="Tang",   birth=773,  death=819,
  bio="柳宗元（773-819），字子厚，唐代文学家，唐宋八大家之一，古文运动主将。",
  representative_works=["tang-070","tang-071","tang-072","tang-073"])
a(id="bai juyi",  name="白居易",  nickname="香山居士",         dynasty="Tang",   birth=772,  death=846,
  bio="白居易（772-846），字乐天，号香山居士，唐代伟大的现实主义诗人，新乐府运动倡导者。",
  representative_works=["tang-074","tang-075","tang-076","tang-077","tang-078","tang-079","tang-080"])
a(id="lu lun",    name="卢纶",    nickname="卢允言",           dynasty="Tang",   birth=739,  death=799,
  bio="卢纶（739-799），字允言，唐代诗人，大历十才子之一。",
  representative_works=["tang-081","tang-082"])
a(id="jia dao",   name="贾岛",    nickname="贾浪仙",           dynasty="Tang",   birth=779,  death=843,
  bio="贾岛（779-843），字浪仙，唐代诗人，以苦吟著称，与孟郊并称"郊寒岛瘦"。",
  representative_works=["tang-083","tang-084"])
a(id="zhang jiu", name="张九龄",  nickname="张子寿",           dynasty="Tang",   birth=678,  death=740,
  bio="张九龄（678-740），字子寿，唐代政治家、诗人，曾任宰相。",
  representative_works=["tang-085","tang-086"])
a(id="wei yingwu",name="韦应物",  nickname="韦苏州",           dynasty="Tang",   birth=737,  death=792,
  bio="韦应物（737-792），唐代诗人，世称韦苏州，以山水田园诗见长。",
  representative_works=["tang-087","tang-088","tang-089"])
a(id="yuan zhen", name="元稹",    nickname="元微之",           dynasty="Tang",   birth=779,  death=831,
  bio="元稹（779-831），字微之，唐代诗人，与白居易并称"元白"。",
  representative_works=["tang-090","tang-091"])
a(id="zhu qiao",  name="朱庆馀",  nickname="朱庆馀",           dynasty="Tang",   birth=797,  death=854,
  bio="朱庆馀（797-854），唐代诗人，其诗风清新婉约。",
  representative_works=["tang-092"])
a(id="zheng qiao",name="郑畋",    nickname="郑台文",           dynasty="Tang",   birth=825,  death=882,
  bio="郑畋（825-882），字台文，唐代诗人。",
  representative_works=["tang-093"])
a(id="xu hui",   name="许浑",    nickname="许丁卯",           dynasty="Tang",   birth=791,  death=837,
  bio="许浑（约791-约837），字用晦，唐代诗人，以律诗著称。",
  representative_works=["tang-094","tang-095"])
a(id="zhao gnp",  name="赵嘏",    nickname="赵承祐",           dynasty="Tang",   birth=806,  death=852,
  bio="赵嘏（约806-852），字承祐，唐代诗人。",
  representative_works=["tang-096"])
a(id="li shangyin",name="李商隐",nickname="玉溪生",           dynasty="Tang",   birth=813,  death=858,
  bio="李商隐（813-858），字义山，晚唐杰出诗人，无题诗著称于世。",
  representative_works=["tang-051","tang-052","tang-053","tang-054","tang-055"])
a(id="zhang bi",  name="张碧",    nickname="张碧",             dynasty="Tang",   birth=806,  death=854,
  bio="张碧（约806-854），唐代诗人。",
  representative_works=["tang-097"])
a(id="meng jia",  name="孟郊",    nickname="孟东野",           dynasty="Tang",   birth=751,  death=814,
  bio="孟郊（751-814），字东野，唐代诗人。",
  representative_works=["tang-011","tang-050","tang-098"])
a(id="wang jiao", name="王郊",    nickname="王郊",             dynasty="Tang",   birth=751,  death=814,
  bio="王郊，与孟郊并称，唐代诗人。",
  representative_works=["tang-098"])
a(id="lu qun",    name="卢群",    nickname="卢群",             dynasty="Tang",   birth=749,  death=804,
  bio="卢群（749-804），唐代诗人。",
  representative_works=["tang-099"])

# Song Authors
a(id="sushi",     name="苏轼",    nickname="东坡居士",         dynasty="Song",   birth=1037, death=1101,
  bio="苏轼（1037-1101），字子瞻，号东坡居士，北宋文学家，诗书画皆精，豪放派代表。",
  representative_works=["song-001","song-002","song-010","song-011","song-012","song-013","song-014"])
a(id="xinqiji",   name="辛弃疾",  nickname="稼轩居士",         dynasty="Song",   birth=1140, death=1207,
  bio="辛弃疾（1140-1207），字幼安，号稼轩，南宋豪放派词人，与苏轼并称"苏辛"。",
  representative_works=["song-003","song-004","song-015","song-016","song-017","song-018"])
a(id="liqingzhao",name="李清照",  nickname="易安居士",         dynasty="Song",   birth=1084, death=约1155,
  bio="李清照（1084-约1155），号易安居士，宋代最杰出的女词人，婉约派代表。",
  representative_works=["song-005","song-006","song-019","song-020","song-021"])
a(id="yuefei",    name="岳飞",    nickname="鹏举",             dynasty="Song",   birth=1103, death=1142,
  bio="岳飞（1103-1142），字鹏举，南宋抗金名将，民族英雄，词作慷慨激昂。",
  representative_works=["song-007","song-022"])
a(id="luyou",     name="陆游",    nickname="放翁",             dynasty="Song",   birth=1125, death=1210,
  bio="陆游（1125-1210），字务观，号放翁，南宋爱国诗人，诗词皆工。",
  representative_works=["song-023","song-024","song-025","song-026","song-027","song-028"])
a(id="liyu",      name="李煜",    nickname="莲峰居士",         dynasty="Song",   birth=937,  death=978,
  bio="李煜（937-978），字重光，南唐后主，工词，其词亡国后尤为沉痛。",
  representative_works=["song-029","song-030","song-031","song-032"])
a(id="liuyong",   name="柳永",    nickname="奉旨填词",         dynasty="Song",   birth=984,  death=1053,
  bio="柳永（984-1053），原名三变，字景庄，北宋词人，婉约派代表人物。",
  representative_works=["song-033","song-034","song-035"])
a(id="yanshu",    name="晏殊",    nickname="晏元献",           dynasty="Song",   birth=991,  death=1055,
  bio="晏殊（991-1055），字同叔，北宋词人，婉约派代表，词风典雅和婉。",
  representative_works=["song-036","song-037","song-038"])
a(id="ouyangxiu", name="欧阳修",  nickname="醉翁",             dynasty="Song",   birth=1007, death=1072,
  bio="欧阳修（1007-1072），字永叔，号醉翁，北宋文坛领袖，唐宋八大家之一。",
  representative_works=["song-039","song-040","song-041","song-042","prose-006"])
a(id="wanganshi", name="王安石",  nickname="临川先生",         dynasty="Song",   birth=1021, death=1086,
  bio="王安石（1021-1086），字介甫，号临川，北宋政治家、文学家，唐宋八大家之一。",
  representative_works=["song-043","song-044","song-045","prose-013"])
a(id="fanzhongyan",name="范仲淹", nickname="范文正",          dynasty="Song",   birth=989,  death=1052,
  bio="范仲淹（989-1052），字希文，谥号文正，北宋政治家、文学家。",
  representative_works=["song-046","song-047","prose-007"])
a(id="qin guan",   name="秦观",   nickname="淮海居士",         dynasty="Song",   birth=1049, death=1100,
  bio="秦观（1049-1100），字少游，号淮海居士，北宋婉约派词人，苏门四学士之一。",
  representative_works=["song-048","song-049","song-050"])
a(id="zhoubangyan",name="周邦彦", nickname="清真居士",         dynasty="Song",   birth=1056, death=1121,
  bio="周邦彦（1056-1121），字美成，号清真居士，北宋词人，婉约派集大成者。",
  representative_works=["song-051","song-052","song-053"])
a(id="he zhi",    name="贺铸",    nickname="贺梅子",           dynasty="Song",   birth=1052, death=1125,
  bio="贺铸（1052-1125），字方回，号庆湖遗老，北宋词人。",
  representative_works=["song-054"])
a(id="jiang kui",  name="姜夔",   nickname="白石道人",         dynasty="Song",   birth=1154, death=1221,
  bio="姜夔（1154-1221），字尧章，号白石道人，南宋词人、音乐家。",
  representative_works=["song-055","song-056"])
a(id="wenzhao",   name="文天祥",  nickname="文文山",           dynasty="Song",   birth=1236, death=1283,
  bio="文天祥（1236-1283），字履善，号文山，南宋末年抗元名臣，民族英雄。",
  representative_works=["song-057","song-058"])
a(id="liu guo",   name="刘过",    nickname="龙洲道人",         dynasty="Song",   birth=1154, death=1206,
  bio="刘过（1154-1206），字改之，号龙洲道人，南宋词人。",
  representative_works=["song-059"])
a(id="xue Tao",   name="薛涛",   nickname="薛校书",           dynasty="Tang",   birth=768,  death=832,
  bio="薛涛（768-832），字洪度，唐代女诗人，才情出众。",
  representative_works=["tang-100"])
a(id="yu Wur",   name="鱼玄机",  nickname="鱼幼微",           dynasty="Tang",   birth=844,  death=871,
  bio="鱼玄机（844-871），字幼微，唐代女诗人，温庭筠之弟子。",
  representative_works=["tang-101"])
a(id="li qingzhao2",name="李清照",nickname="易安居士",         dynasty="Song",   birth=1084, death=约1155,
  bio="李清照（1084-约1155），号易安居士，宋代最杰出的女词人。",
  representative_works=["song-005","song-006","song-019","song-020","song-021"])
a(id="wanzhang",  name="万俟咏",  nickname="大声",             dynasty="Song",   birth=生卒年不详, death=?,
  bio="万俟咏，字大声，北宋词人。",
  representative_works=["song-060"])
a(id="yantong",   name="晏几道",  nickname="小山",             dynasty="Song",   birth=1038, death=1110,
  bio="晏几道（1038-1110），字叔原，号小山，晏殊之子，北宋婉约派词人。",
  representative_works=["song-061","song-062","song-063"])
a(id="huang tingjian",name="黄庭坚",nickname="山谷道人",       dynasty="Song",   birth=1045, death=1105,
  bio="黄庭坚（1045-1105），字鲁直，号山谷道人，北宋诗人、词人，江西诗派开创者。",
  representative_works=["song-064","song-065"])
a(id="chao Buz",  name="晁补之",  nickname="济北",             dynasty="Song",   birth=1053, death=1110,
  bio="晁补之（1053-1110），字无咎，号归来子，北宋文学家，苏门四学士之一。",
  representative_works=["song-066"])
a(id="zhang xie", name="张先",    nickname="张子野",           dynasty="Song",   birth=990,  death=1078,
  bio="张先（990-1078），字子野，北宋词人。",
  representative_works=["song-067"])
a(id="wang anshi2",name="王安石",nickname="临川先生",          dynasty="Song",   birth=1021, death=1086,
  bio="王安石（1021-1086），字介甫，号临川，北宋政治家、文学家。",
  representative_works=["song-043","song-044","song-045"])
a(id="su shi2",   name="苏辙",    nickname="颍滨遗老",         dynasty="Song",   birth=1039, death=1112,
  bio="苏辙（1039-1112），字子由，号颍滨遗老，北宋文学家，唐宋八大家之一。",
  representative_works=["song-068","prose-015"])
a(id="zeng gong", name="曾巩",    nickname="南丰先生",         dynasty="Song",   birth=1019, death=1083,
  bio="曾巩（1019-1083），字子固，号南丰先生，北宋文学家，唐宋八大家之一。",
  representative_works=["prose-014"])
a(id="huangxing", name="黄庭坚",  nickname="山谷",             dynasty="Song",   birth=1045, death=1105,
  bio="黄庭坚（1045-1105），字鲁直，号山谷道人，北宋诗人、词人。",
  representative_works=["song-064","song-065"])
a(id="li zhi",    name="李清照",  nickname="易安",             dynasty="Song",   birth=1084, death=约1155,
  bio="李清照（1084-约1155），宋代著名女词人。",
  representative_works=["song-005","song-006","song-019","song-020","song-021"])
a(id="zhounong",  name="周邦彦",  nickname="清真",             dynasty="Song",   birth=1056, death=1121,
  bio="周邦彦（1056-1121），字美成，号清真居士，北宋词人。",
  representative_works=["song-051","song-052","song-053"])
a(id="xue Meng",  name="徐俯",    nickname="东湖",             dynasty="Song",   birth=1075, death=1141,
  bio="徐俯（1075-1141），字师川，号东湖，南宋诗人。",
  representative_works=["song-069"])
a(id="li you",    name="刘一止",  nickname="苕溪",             dynasty="Song",   birth=1078, death=1161,
  bio="刘一止（1078-1161），字则行，南宋词人。",
  representative_works=["song-070"])
a(id="cao xia",   name="曹豳",   nickname="西隐",             dynasty="Song",   birth=生卒年不详, death=?,
  bio="曹豳，字西隐，南宋词人。",
  representative_works=["song-071"])
a(id="lin bu",    name="林逋",    nickname="和靖先生",          dynasty="Song",   birth=967,  death=1028,
  bio="林逋（967-1028），字君复，号和靖先生，北宋诗人，以梅鹤为伴。",
  representative_works=["song-072"])
a(id="ouyang jiong",name="欧阳炅",nickname="无",              dynasty="Song",   birth=生卒年不详, death=?,
  bio="欧阳炅，北宋词人。",
  representative_works=["song-073"])
a(id="zhang Ai",  name="张辑",    nickname="东泽",             dynasty="Song",   birth=生卒年不详, death=?,
  bio="张辑，字东泽，南宋词人，受姜夔影响。",
  representative_works=["song-074"])

# Prose Authors
a(id="mengzi",    name="孟子",    nickname="孟轲",             dynasty="Pre-Qin",birth=-372, death=-289,
  bio="孟子（约前372-前289），名轲，战国时期思想家，儒家学派代表人物，被称为"亚圣"。",
  representative_works=["prose-001","prose-008","prose-016","prose-017"])
a(id="xunzi",     name="荀子",    nickname="荀卿",             dynasty="Pre-Qin",birth=-313, death=-238,
  bio="荀子（约前313-前238），名况，字卿，战国时期思想家，儒家学派代表人物。",
  representative_works=["prose-018"])
a(id="zhuangzi",  name="庄子",    nickname="庄周",             dynasty="Pre-Qin",birth=-369, death=-286,
  bio="庄子（约前369-前286），名周，战国时期道家代表人物，《庄子》一书作者。",
  representative_works=["prose-019","prose-020"])
a(id="guoyu",     name="国语",    nickname="",                 dynasty="Pre-Qin",birth=0,    death=0,
  bio="《国语》，又名《春秋外传》，是一部国别体史书。",
  representative_works=["prose-021"])
a(id="zuozhuan",  name="左传",    nickname="",                 dynasty="Pre-Qin",birth=-722, death=-468,
  bio="《左传》，原名《左氏春秋》，儒家经典之一，是中国第一部叙事详细的编年体史书。",
  representative_works=["prose-022","prose-023"])
a(id="shiji",     name="司马迁",  nickname="太史公",           dynasty="Han",    birth=-145, death=-86,
  bio="司马迁（前145-前86），字子长，西汉史学家、文学家，《史记》作者。",
  representative_works=["prose-024","prose-025","prose-026"])
a(id="jiayi",     name="贾谊",    nickname="贾生",             dynasty="Han",    birth=-201, death=-169,
  bio="贾谊（前201-前169），西汉政论家、文学家，《过秦论》作者。",
  representative_works=["prose-027","prose-028"])
a(id="zhuge",     name="诸葛亮",  nickname="卧龙",             dynasty="Han",    birth=181,  death=234,
  bio="诸葛亮（181-234），字孔明，三国时期蜀汉政治家、军事家。",
  representative_works=["prose-029","prose-030"])
a(id="li mi",     name="李密",    nickname="陈情表",           dynasty="Han",    birth=224,  death=287,
  bio="李密（224-287），字令伯，西晋官员，《陈情表》作者。",
  representative_works=["prose-031"])
a(id="taoyuanming",name="陶渊明", nickname="五柳先生",        dynasty="Jin",    birth=365,  death=427,
  bio="陶渊明（365-427），名潜，字元亮，号五柳先生，东晋诗人、文学家，田园诗派的开创者。",
  representative_works=["prose-002","prose-003","prose-004","prose-005","prose-032"])
a(id="wangxizhi", name="王羲之",  nickname="书圣",             dynasty="Jin",    birth=303,  death=361,
  bio="王羲之（303-361），字逸少，东晋书法家，《兰亭集序》作者，有"书圣"之称。",
  representative_works=["prose-006"])
a
# ── Tang Poems (26 original + comprehensive expansion) ────────────────────────
poems = []

def add_poem(p): poems.append(p)

# 001-030 (Core Tang - already defined, adding more)
add_poem(P("tang-001","静夜思","李白","libai","Tang","shi",1,
    "床前明月光，疑是地上霜。\n举头望明月，低头思故乡。",
    "明亮的月光洒在床前，就像地上泛起了一层霜。我抬起头望着天上的明月，不由自主地低下头来，想起了远方的故乡。",
    "床：井栏。疑：好像。举头：抬头。思：思念。",
    "李白（701-762），字太白，号青莲居士，唐代伟大的浪漫主义诗人。此诗写于开元十四年（726年）前后。",
    ["思乡","月亮","夜景","童年"],"唐诗三百首","primary","语文一年级上",
    ["思乡","月亮"],"","ai_poem_001",
    [{"url":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800","title":"月夜","artist":"","year":""}]))

add_poem(P("tang-002","望庐山瀑布","李白","libai","Tang","shi",1,
    "日照香炉生紫烟，遥看瀑布挂前川。\n飞流直下三千尺，疑是银河落九天。",
    "太阳照耀着香炉峰，山间升起了紫色的云烟。远远望去，瀑布像一条白绢挂在山前。水流飞速从三千尺高的山崖上倾泻而下，真让人怀疑是银河从天上降落到了人间。",
    "香炉：香炉峰。紫烟：云雾呈紫色。三千尺：极言其高。九天：天的最高处。",
    "李白游历庐山时所作，通过夸张手法描写庐山瀑布的壮观景象。",
    ["山水","瀑布","庐山","写景"],"唐诗三百首","primary","语文二年级上",
    ["山水","瀑布","夸张"],"","ai_poem_002",
    [{"url":"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800","title":"庐山瀑布","artist":"张大千","year":"现代"}]))

add_poem(P("tang-003","赠汪伦","李白","libai","Tang","shi",1,
    "李白乘舟将欲行，忽闻岸上踏歌声。\n桃花潭水深千尺，不及汪伦送我情。",
    "李白我正登上小船即将离去，忽然听到岸上传来踏歌送行的声音。即使桃花潭的水深达千尺，也比不上汪伦对我的情谊啊。",
    "汪伦：李白的朋友。踏歌：边走边唱的送行方式。桃花潭：在今安徽泾县。",
    "李白游安徽泾县桃花潭时，朋友汪伦以踏歌送行，李白感动之余写下此诗。",
    ["送别","友情","桃花潭"],"唐诗三百首","primary","语文二年级上",
    ["送别","友情"],"","ai_poem_003"))

add_poem(P("tang-004","春晓","孟浩然","menghaoran","Tang","shi",1,
    "春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。",
    "春天里睡得很香甜，不知不觉天就亮了。醒来时听到处都是鸟儿的啼叫声。回想昨夜风声雨声阵阵，不知有多少花瓣被吹落了下来。",
    "春晓：春天的早晨。眠：睡觉。晓：天亮。啼鸟：鸣叫的鸟。",
    "孟浩然（689-740），唐代山水田园派诗人。此诗抓住春天早晨一瞬间的感受，表达对春光的珍惜。",
    ["春天","惜春","自然"],"唐诗三百首","primary","语文一年级下",
    ["春天","自然"],"","ai_poem_004"))

add_poem(P("tang-005","登鹳雀楼","王之涣","wangzhihuan","Tang","shi",1,
    "白日依山尽，黄河入海流。\n欲穷千里目，更上一层楼。",
    "太阳沿着山脉慢慢沉落，黄河之水奔流向大海。想要看得更远，看见千里之外的风光，就必须要再登上一层楼。",
    "鹳雀楼：在今山西永济。穷：尽。更：再。",
    "王之涣盛唐边塞诗人，此诗写登楼远眺之景。欲穷千里目，更上一层楼富有哲理，成为千古名句。",
    ["登楼","黄河","哲理","望远"],"唐诗三百首","primary","语文二年级上",
    ["登楼","哲理","黄河"],"","ai_poem_005"))

add_poem(P("tang-006","出塞","王昌龄","wangchangling","Tang","shi",2,
    "秦时明月汉时关，万里长征人未还。\n但使龙城飞将在，不教胡马度阴山。",
    "明月照着秦代的边关，也照着汉代的边关。多少将士万里出征再也没有回来。只要有像龙城飞将军李广那样的良将，就绝不会让敌人的战马越过阴山半步。",
    "龙城飞将：指汉代名将李广。阴山：今内蒙古中部山脉。",
    "王昌龄（约698-756），盛唐边塞诗人。此诗表达了渴望良将守边、和平安宁的愿望。",
    ["边塞","战争","爱国","壮志"],"唐诗三百首","middle","语文八年级上",
    ["边塞","爱国","战争"],"","ai_poem_006"))

add_poem(P("tang-007","黄鹤楼送孟浩然之广陵","崔颢","cuihao","Tang","shi",2,
    "昔人已乘黄鹤去，此地空余黄鹤楼。\n黄鹤一去不复返，白云千载空悠悠。\n晴川历历汉阳树，芳草萋萋鹦鹉洲。\n日暮乡关何处是，烟波江上使人愁。",
    "过去的仙人已经乘着黄鹤飞去，只留下这座空荡荡的黄鹤楼。黄鹤飞走就再也不回来了，只有白云千百年来还是那样悠悠飘荡。晴朗的天气里汉阳的树木清晰可见，鹦鹉洲上长满了茂盛的芳草。夕阳西下，哪里是我的故乡呢？江上的烟波浩渺让人忧愁。",
    "黄鹤楼：江南三大名楼之一。昔人：指仙人子安。鹦鹉洲：长江中的沙洲。",
    "崔颢（约704-754），此诗被誉为唐人七律之首，借黄鹤楼传说抒发怀古之情和思乡之愁。",
    ["送别","黄鹤楼","怀古","思乡"],"唐诗三百首","middle","语文八年级下",
    ["送别","怀古","思乡","黄鹤楼"],"","ai_poem_007",
    [{"url":"https://images.unsplash.com/photo-1547481887-a26e2cacb5c7?w=800","title":"黄鹤楼","artist":"","year":""}]))

add_poem(P("tang-008","悯农（其二）","李绅","lishen","Tang","shi",1,
    "锄禾日当午，汗滴禾下土。\n谁知盘中餐，粒粒皆辛苦。",
    "农民在正午的烈日下锄地，汗水顺着禾苗滴落在泥土中。有谁能知道，盘中的饭食，每一粒都饱含着农民辛苦的劳动。",
    "锄禾：为禾苗松土除草。盘中餐：碗里的饭食。皆：都。",
    "李绅（772-846），唐代诗人，悯农二首表达了诗人对农民艰辛劳动的深切同情。",
    ["农民","劳动","节约","同情"],"唐诗三百首","primary","语文一年级下",
    ["悯农","劳动","节约"],"","ai_poem_008"))

add_poem(P("tang-009","绝句","杜甫","dufu","Tang","shi",1,
    "两个黄鹂鸣翠柳，一行白鹭上青天。\n窗含西岭千秋雪，门泊东吴万里船。",
    "两只黄鹂在翠绿的柳树上鸣叫，一行白鹭飞上了蓝蓝的天空。从窗口可以看到西岭千年不化的积雪，门前停泊着从万里之外的东吴来的船只。",
    "西岭：指成都西部的岷山。千秋雪：千年不化的积雪。东吴：指长江下游地区。",
    "杜甫（712-770），唐代伟大的现实主义诗人。此诗写于成都草堂，表达了诗人对和平生活的热爱。",
    ["春天","写景","草堂","杜甫"],"唐诗三百首","primary","语文二年级上",
    ["春天","写景","杜甫"],"","ai_poem_009"))

add_poem(P("tang-010","枫桥夜泊","张继","zhangji","Tang","shi",2,
    "月落乌啼霜满天，江枫渔火对愁眠。\n姑苏城外寒山寺，夜半钟声到客船。",
    "月亮落下去了，乌鸦在霜气满天的夜里啼叫，江边的枫树和渔船上的灯火，陪伴着满怀忧愁的旅人难以入眠。苏州城外的寒山寺里，半夜敲响的钟声传到了我这艘客船上。",
    "枫桥：在今江苏苏州阊门外。姑苏：苏州的别称。寒山寺：苏州著名寺庙。",
    "张继（约715-约779），唐代诗人。此诗以清冷幽寂的意境著称，枫桥、寒山寺、客船、钟声，构成了一幅绝美的江南夜景图。",
    ["夜景","枫桥","客船","钟声","失眠"],"唐诗三百首","middle","语文八年级上",
    ["夜景","失眠","思乡"],"","ai_poem_010"))

add_poem(P("tang-011","游子吟","孟郊","mengjiao","Tang","shi",2,
    "慈母手中线，游子身上衣。\n临行密密缝，意恐迟迟归。\n谁言寸草心，报得三春晖。",
    "慈祥的母亲手里拿着针线，为即将远行的儿子缝制身上的衣服。谁能说子女像小草那样微小的孝心，能报答得了像春晖般伟大的母爱呢？",
    "游子：离家远行的人。寸草心：小草的嫩心，比喻子女孝心。三春晖：春天三个月的阳光，比喻母爱。",
    "孟郊（751-814），唐代诗人。这首诗深情地歌颂了母爱的伟大，是中华孝道文化的经典代表作品。",
    ["母爱","亲情","孝道","感恩"],"唐诗三百首","middle","语文六年级下",
    ["母爱","亲情","孝道"],"","ai_poem_011"))

add_poem(P("tang-012","相思","王维","wangwei","Tang","shi",1,
    "红豆生南国，春来发几枝。\n愿君多采撷，此物最相思。",
    "红豆树生长在南方，春天到了它又发出多少新枝呢？希望您能多采摘一些，因为红豆是最能表达思念之情的。",
    "红豆：又名相思子，产于南方，果实鲜红，象征爱情和思念。采撷：采摘。",
    "王维（699-761），唐代山水田园派诗人。此诗借红豆以寄相思之情，是五言绝句中的精品。",
    ["相思","红豆","思念","爱情"],"唐诗三百首","primary","语文六年级上",
    ["相思","爱情","红豆"],"","ai_poem_012"))

add_poem(P("tang-013","山居秋暝","王维","wangwei","Tang","shi",2,
    "空山新雨后，天气晚来秋。\n明月松间照，清泉石上流。\n竹喧归浣女，莲动下渔舟。\n随意春芳歇，王孙自可留。",
    "空旷的山中刚下过雨，傍晚的天气带着秋天的凉意。明月透过松林洒下清辉，清澈的泉水在石头上流淌。竹林里传来喧笑声，是洗衣服的姑娘们回来了；莲叶摇动，是渔夫划着船下来了。",
    "秋暝：秋天的傍晚。空山：幽静的山林。浣女：洗衣的女子。",
    "王维山水诗的代表作，描绘了秋日山林的清幽静谧之美。",
    ["山水","秋景","隐居","王维"],"唐诗三百首","middle","语文八年级上",
    ["山水","秋景","隐居"],"","ai_poem_013"))

add_poem(P("tang-014","使至塞上","王维","wangwei","Tang","shi",3,
    "单车欲问边，属国过居延。\n征蓬出汉塞，归雁入胡天。\n大漠孤烟直，长河落日圆。\n萧关逢候骑，都护在燕然。",
    "我轻车简从前往边疆慰问，路过居延属国继续前行。浩瀚的沙漠中一缕狼烟直上云霄，漫长的黄河边一轮落日浑圆。",
    "使：出使。属国：附属国。居延：古地名，在今甘肃。",
    "王维以监察御史身份赴边疆慰问途中所作。大漠孤烟直，长河落日圆以简洁的笔触勾勒出壮阔苍凉的塞外风光。",
    ["边塞","沙漠","王维","塞外风光"],"唐诗三百首","high","语文九年级下",
    ["边塞","沙漠","王维"],"","ai_poem_014"))

add_poem(P("tang-015","鸟鸣涧","王维","wangwei","Tang","shi",1,
    "人闲桂花落，夜静春山空。\n月出惊山鸟，时鸣春涧中。",
    "人声寂静，桂花无声地飘落；夜色宁静，春天的山林空旷无人。月亮升起来了，惊动了正在栖息的山鸟，不时在春天的山涧中鸣叫。",
    "鸟鸣涧：鸟儿在山涧中鸣叫。闲：寂静。桂花：春桂，春天开花。",
    "王维山水诗的代表作，以动写静，通过桂花飘落、鸟鸣等细微动态，衬托出春夜山涧的极度静谧。",
    ["春天","夜景","静谧","王维","山水"],"唐诗三百首","primary","语文五年级上",
    ["春天","静谧","夜景"],"","ai_poem_015"))

add_poem(P("tang-016","凉州词","王之涣","wangzhihuan","Tang","shi",2,
    "黄河远上白云间，一片孤城万仞山。\n羌笛何须怨杨柳，春风不度玉门关。",
    "黄河远远地流淌在白云之间，一座孤零零的城堡矗立在万丈高山之中。羌笛何必吹奏那哀怨的折杨柳曲呢，春风是吹不到玉门关的啊。",
    "凉州词：乐府旧题。万仞：形容极高。羌笛：少数民族的乐器。玉门关：在今甘肃敦煌西北。",
    "王之涣的代表作，写边塞的荒凉和戍边将士的乡愁。",
    ["边塞","凉州","乡愁","春风"],"唐诗三百首","middle","语文八年级下",
    ["边塞","乡愁","春风"],"","ai_poem_016"))

add_poem(P("tang-017","送元二使安西","王维","wangwei","Tang","shi",1,
    "渭城朝雨浥轻尘，客舍青青柳色新。\n劝君更尽一杯酒，西出阳关无故人。",
    "渭城早晨的细雨打湿了轻轻的尘土，旅店旁的柳树显得格外青翠清新。劝您再干一杯酒吧，向西出了阳关之后，就再也没有老朋友了。",
    "元二：作者的朋友。安西：唐代安西都护府。渭城：在今陕西咸阳。阳关：在今甘肃敦煌西南。",
    "王维送朋友赴安西任职时所作，后被谱成《阳关三叠》，成为送别诗词的经典。",
    ["送别","阳关","友情","王维"],"唐诗三百首","middle","语文七年级上",
    ["送别","友情","阳关"],"","ai_poem_017"))

add_poem(P("tang-018","从军行","王昌龄","wangchangling","Tang","shi",2,
    "青海长云暗雪山，孤城遥望玉门关。\n黄沙百战穿金甲，不破楼兰终不还。",
    "青海湖上浓云密布，遮暗了远处的雪山，孤城与玉门关遥遥相望。在黄沙漫天的大漠里，身经百战，铠甲都被磨穿了，但不打败敌人就绝不回来。",
    "从军行：乐府旧题。青海：青海湖。楼兰：汉代西域小国，这里代指敌人。",
    "王昌龄边塞诗的代表，表达了边塞将士誓死杀敌的决心和英雄气概。",
    ["边塞","从军","战争","壮志"],"唐诗三百首","middle","语文八年级下",
    ["边塞","战争","壮志"],"","ai_poem_018"))

add_poem(P("tang-019","芙蓉楼送辛渐","王昌龄","wangchangling","Tang","shi",2,
    "寒雨连江夜入吴，平明送客楚山孤。\n洛阳亲友如相问，一片冰心在玉壶。",
    "带着寒意的雨笼罩着江面，夜间进入吴地；天亮时送别客人，只看到孤独的楚山。如果洛阳的亲友问起我，就告诉他们，我的心像玉壶中的冰一样晶莹纯洁。",
    "芙蓉楼：在今江苏镇江。辛渐：作者的朋友。冰心：纯洁的心。",
    "王昌龄被贬为江宁丞时送别朋友辛渐所作。诗人以冰心玉壶自喻，表达自己虽遭贬谪但仍保持高洁品格。",
    ["送别","友情","高洁","自喻"],"唐诗三百首","middle","语文七年级下",
    ["送别","友情","高洁"],"","ai_poem_019"))

add_poem(P("tang-020","望天门山","李白","libai","Tang","shi",1,
    "天门中断楚江开，碧水东流至此回。\n两岸青山相对出，孤帆一片日边来。",
    "天门山从中间断开，是楚江把它冲开的，碧绿的江水向东流到这里折向北去。两崖的青山隔江相对峙，一艘小船从太阳那边悠悠驶来。",
    "天门山：在今安徽当涂。楚江：长江流经楚地的一段。",
    "李白描写天门山壮丽景色的诗篇，以轻快明朗的笔调，勾勒出天门山的雄奇险峻和长江的浩荡奔流。",
    ["山水","长江","天门山","李白"],"唐诗三百首","primary","语文三年级上",
    ["山水","长江","天门山"],"","ai_poem_020"))

add_poem(P("tang-021","早发白帝城","李白","libai","Tang","shi",1,
    "朝辞白帝彩云间，千里江陵一日还。\n两岸猿声啼不住，轻舟已过万重山。",
    "早晨告别了高入彩云间的白帝城，千里之外的江陵一天就可以到达。轻快的小船已经驶过了万重山岭。",
    "白帝城：在今重庆奉节。江陵：今湖北荆州市。",
    "李白被流放夜郎途中遇赦返回时所作，表达了诗人获得自由后的喜悦心情，全诗轻快飞扬。",
    ["长江","舟行","喜悦","李白","遇赦"],"唐诗三百首","primary","语文三年级下",
    ["长江","喜悦","李白"],"","ai_poem_021"))

add_poem(P("tang-022","峨眉山月歌","李白","libai","Tang","shi",2,
    "峨眉山月半轮秋，影入平羌江水流。\n夜发清溪向三峡，思君不见下渝州。",
    "峨眉山的上空悬挂着半轮秋月，月影倒映在平羌江的水面上。夜里从清溪驿出发直奔三峡，想念你却见不到，只好继续前往渝州。",
    "峨眉山：在今四川。半轮秋：半轮秋月。平羌江：今青衣江。三峡：长江三峡。",
    "李白青年时期离开蜀地时所作，全诗连用五个地名，构思精巧。",
    ["月亮","四川","三峡","李白"],"唐诗三百首","middle","语文七年级上",
    ["月亮","三峡","思乡"],"","ai_poem_022"))

add_poem(P("tang-023","春夜洛城闻笛","李白","libai","Tang","shi",1,
    "谁家玉笛暗飞声，散入春风满洛城。\n此夜曲中闻折柳，何人不起故园情。",
    "是谁家的玉笛在暗中吹奏，那悠扬的笛声随着春风散布在整座洛阳城里。今夜听到这折杨柳的曲子，谁能不生起思念故乡的感情呢？",
    "洛城：洛阳。玉笛：对笛子的美称。折柳：即折杨柳，古代送别曲。",
    "李白旅居洛阳时所作，诗人听到笛声而引发思乡之情。",
    ["思乡","笛声","洛阳","李白"],"唐诗三百首","middle","语文八年级下",
    ["思乡","笛声","春天"],"","ai_poem_023"))

add_poem(P("tang-024","客中行","李白","libai","Tang","shi",1,
    "兰陵美酒郁金香，玉碗盛来琥珀光。\n但使主人能醉客，不知何处是他乡。",
    "兰陵出产的美酒散发着郁金香的芬芳，用玉碗盛来呈现出琥珀般的光泽。只要主人能让客人喝醉，就不会觉得哪里是异乡了。",
    "兰陵：今山东枣庄。郁金香：一种香草，这里指酒香。琥珀：形容酒色。",
    "李白漫游山东时所作，表达了诗人豪放豁达的情怀。",
    ["美酒","客居","豪放","李白"],"唐诗三百首","middle","语文八年级下",
    ["美酒","豪放","客居"],"","ai_poem_024"))

add_poem(P("tang-025","将进酒（节选）","李白","libai","Tang","shi",2,
    "君不见黄河之水天上来，奔流到海不复回。\n君不见高堂明镜悲白发，朝如青丝暮成雪。\n人生得意须尽欢，莫使金樽空对月。\n天生我材必有用，千金散尽还复来。",
    "黄河的水从天上奔涌而来，流向大海一去不返。人生在得意的时候就该尽情欢乐，不要让酒杯空对着月亮。老天让我生来就必定有用途，千金花光了还会再回来。",
    "将进酒：乐府旧题，意为请喝酒。金樽：酒杯。",
    "李白被唐玄宗赐金放还后所作，诗中既有人生短暂、时光易逝的感慨，更有天生我材必有用的自信与豪放。",
    ["豪放","饮酒","自信","人生","李白"],"唐诗三百首","middle","语文选修",
    ["豪放","自信","人生"],"","ai_poem_025"))

add_poem(P("tang-026","渡荆门送别","李白","libai","Tang","shi",2,
    "渡远荆门外，来从楚国游。\n山随平野尽，江入大荒流。\n月下飞天镜，云生结海楼。\n仍怜故乡水，万里送行舟。",
    "我从荆门之外渡江，远赴楚国之地游览。山岭随着平原的出现渐渐消失，长江流入广阔的原野。月光倒映在水面上，像是天上飞下来的镜子；云雾升腾，凝结成海市蜃楼的景象。我仍然喜爱故乡的水，它万里迢迢送我的行舟。",
    "荆门：荆门山，在今湖北宜都。大荒：广阔的原野。故乡水：长江水自蜀出。",
    "李白离开蜀地赴楚漫游时所作，描写了渡过荆门后的壮阔景色，并以故乡水送行表达对故乡的眷恋。",
    ["送别","长江","故乡","李白"],"唐诗三百首","middle","语文八年级上",
    ["送别","故乡","长江"],"","ai_poem_026"))

# Continue with more famous Tang poems
add_poem(P("tang-027","行路难（其一）","李白","libai","Tang","shi",2,
    "金樽清酒斗十千，玉盘珍羞直万钱。\n停杯投箸不能食，拔剑四顾心茫然。\n欲渡黄河冰塞川，将登太行雪满山。\n闲来垂钓碧溪上，忽复乘舟梦日边。\n行路难，行路难，多歧路，今安在？\n长风破浪会有时，直挂云帆济沧海。",
    "金杯中的清酒一斗价值十千钱，玉盘里的珍贵菜肴也价值万钱。可是放下酒杯扔掉筷子吃不下去，拔出剑来四处张望心中一片茫然。想要渡过黄河，冰冻封住了河面；想要登上太行山，大雪封住了山路。闲来无事在碧溪上钓鱼，忽然又梦见自己乘船到了太阳旁边。行路难啊，行路难啊，岔路那么多，我的出路在哪里？终有一天我会乘长风破万里浪，横渡沧海！",
    "行路难：乐府旧题。箸：筷子。云帆：像云一样的帆。",
    "李白被唐玄宗赐金放还时所作，表达了诗人政治上遭遇挫折后的苦闷与不甘，以及对理想的执着追求。",
    ["壮志","人生","李白","积极"],"唐诗三百首","high","语文选修",
    ["壮志","人生","李白","积极"],"","ai_poem_027"))

add_poem(P("tang-028","蜀道难","李白","libai","Tang","shi",3,
    "噫吁嚱，危乎高哉！\n蜀道之难，难于上青天！\n蚕丛及鱼凫，开国何茫然！\n尔来四万八千岁，不与秦塞通人烟。\n西当太白有鸟道，可以横绝峨眉巅。\n地崩山摧壮士死，然后天梯石栈相钩连。",
    "呀，多么危险啊，多么高峻啊！蜀道难走，比登天还难！蚕丛和鱼凫建立蜀国，那是多么遥远的事啊！从那以来四万八千年，蜀地与秦地都不通人烟。西面的太白山只有鸟才能飞过的路，可以横越峨眉山巅。山崩地裂壮士牺牲，然后天梯石栈才相互连接起来。",
    "蜀道难：乐府旧题。蚕丛、鱼凫：古蜀国国王。太白：山名。",
    "李白描写蜀道艰险的代表作，想象丰富奇特，气势恢宏，表达了诗人对世事的感慨。",
    ["山水","蜀道","李白","险峻"],"唐诗三百首","high","语文选修",
    ["山水","蜀道","险峻"],"","ai_poem_028"))

add_poem(P("tang-029","黄鹤楼送孟浩然之广陵","李白","libai","Tang","shi",2,
    "故人西辞黄鹤楼，烟花三月下扬州。\n孤帆远影碧空尽，唯见长江天际流。",
    "老朋友在黄鹤楼与我辞别，在这繁花似锦的三月顺流而下到扬州去。那孤零零的帆船越走越远，最后消失在碧蓝的天空尽头，只看见长江水在天边奔流。",
    "烟花：形容春天花繁叶茂的景象。下：顺流而下。扬州：今江苏扬州。",
    "李白送好友孟浩然东下扬州时所作，以明媚的春景反衬离愁，情景交融。",
    ["送别","春天","长江","友情"],"唐诗三百首","middle","语文七年级下",
    ["送别","友情","春天"],"","ai_poem_029"))

add_poem(P("tang-030","茅屋为秋风所破歌","杜甫","dufu","Tang","shi",3,
    "八月秋高风怒号，卷我屋上三重茅。\n茅飞渡江洒江郊，高者挂罥长林梢，下者飘转沉塘坳。\n南村群童欺我老无力，忍能对面为盗贼。\n公然抱茅入竹去，唇焦口燥呼不得，归来倚杖自叹息。\n俄顷风定云墨色，秋天漠漠向昏黑。\n布衾多年冷似铁，娇儿恶卧踏里裂。\n床头屋漏无干处，雨脚如麻未断绝。\n自经丧乱少睡眠，长夜沾湿何由彻！\n安得广厦千万间，大庇天下寒士俱欢颜！\n风雨不动安如山。呜呼！何时眼前突兀见此屋，吾庐独破受冻死亦足！",
    "八月里秋深了，狂风怒吼，卷走了我屋顶上好几层茅草。茅草飞过江去，散落在江边，高一些的挂在树梢上，低一些的飘转落在池塘里。南村的一群孩子欺负我年老无力，竟然忍心当着我的面做起贼来。明目张胆地抱着茅草跑进竹林里去了，我喊得唇焦口干也没有用处，只好回来拄着拐杖独自叹息。过了一会儿，风停了，天上乌云像墨一样黑，秋天的天空阴沉沉的渐渐暗了下来。用了多年的布被子又冷又硬像铁板，孩子睡相不好把被子里子都蹬破了。床头漏雨没有一处是干的，雨点像麻线一样密集不停地落下。自从战乱以来我就很少睡眠，整夜在漏湿中如何捱到天亮！如何能得到宽敞的房屋千万间，庇护天下贫寒的人让他们都露出欢笑！即使刮风下雨也安稳如山。唉！什么时候眼前能突然出现这样的房屋，即使我的茅屋独自破烂、自己受冻而死也满足了！",
    "秋高：深秋。布衾：布被子。广厦：宽敞的房屋。寒士：贫寒的读书人。",
    "杜甫在成都草堂所作，表达了诗人关心民生疾苦、愿为天下寒士谋福利的博大胸怀。",
    ["杜甫","民生","理想","茅屋"],"杜甫诗选","high","语文选修",
    ["杜甫","民生","理想"],"","ai_poem_030"))

add_poem(P("tang-031","望岳","杜甫","dufu","Tang","shi",2,
    "岱宗夫如何？齐鲁青未了。\n造化钟神秀，阴阳割昏晓。\n荡胸生层云，决眦入归鸟。\n会当凌绝顶，一览众山小。",
    "泰山究竟是什么样的呢？从齐到鲁青翠的山色连绵不断。大自然将神奇秀美聚集于泰山，山北山南判若黄昏和拂晓。山中云气层出不穷，瞪大眼睛看那归巢的飞鸟。我一定要登上泰山的顶峰，俯瞰那众山，它们是那么渺小！",
    "岱宗：泰山的别称。齐鲁：春秋战国时的两个国家。造化：天地自然。决眦：睁大眼睛看。",
    "杜甫青年时期所作，表达了青年杜甫渴望登临绝顶的雄心壮志。",
    ["登山","杜甫","壮志","泰山"],"杜甫诗选","middle","语文八年级上",
    ["登山","杜甫","壮志"],"","ai_poem_031"))

add_poem(P("tang-032","春望","杜甫","dufu","Tang","shi",2,
    "国破山河在，城春草木深。\n感时花溅泪，恨别鸟惊心。\n烽火连三月，家书抵万金。\n白头搔更短，浑欲不胜簪。",
    "国家已经破碎，山河依然存在；春天的长安城，草木丛生，非常荒凉。感伤时局，看到花开也不禁流下眼泪；怅恨离别，听到鸟鸣也令人心惊。战争已经持续了三个月，一封家书抵得上万两黄金。头发白了越搔越少，简直连簪子都插不住了。",
    "国破：指安史之乱中长安被攻陷。烽火：战火。家书：家信。簪：束发的装饰。",
    "杜甫在安史之乱期间被困长安所作，深刻表达了战乱中诗人忧国忧民的情怀。",
    ["爱国","杜甫","战争","思乡"],"杜甫诗选","high","语文高中必修",
    ["爱国","杜甫","战争"],"","ai_poem_032"))

add_poem(P("tang-033","蜀相","杜甫","dufu","Tang","shi",2,
    "丞相祠堂何处寻，锦官城外柏森森。\n映阶碧草自春色，隔叶黄鹂空好音。\n三顾频烦天下计，两朝开济老臣心。\n出师未捷身先死，长使英雄泪满襟。",
    "到哪里去找诸葛亮的祠堂呢？就在成都城外那柏树茂密的地方。映照台阶的碧草空自有春天的景色，隔着树叶的黄鹂鸟也空有美妙的歌声。当年刘备三顾茅庐，多次向诸葛亮请教天下大计，诸葛亮辅佐刘备开创基业，又辅佐刘禅撑持危局，表现出老臣的一片忠心。可惜出师北伐还未成功就先去世了，这常常使得后世的英雄泪流满襟。",
    "蜀相：诸葛亮。锦官城：成都。三顾：刘备三次拜访诸葛亮。",
    "杜甫游览成都武侯祠时所作，颂扬了诸葛亮鞠躬尽瘁、死而后已的忠臣形象。",
    ["杜甫","诸葛亮","怀古","忠诚"],"杜甫诗选","high","语文高中必修",
    ["杜甫","诸葛亮","怀古"],"","ai_poem_033"))

add_poem(P("tang-034","春夜喜雨","杜甫","dufu","Tang","shi",1,
    "好雨知时节，当春乃发生。\n随风潜入夜，润物细无声。\n野径云俱黑，江船火独明。\n晓看红湿处，花重锦官城。",
    "好的雨知道适应季节，当春天万物生长的时候就及时落下。伴随着春风在夜里悄悄降临，无声地滋润着万物。乡间小路上乌云浓重，只有江面上的小船灯火独自明亮着。天亮时再看那被雨打湿的花丛，整个锦官城万紫千红，花朵沉甸甸的。",
    "乃：就。发生：催发万物生长。润物：滋润万物。锦官城：成都。",
    "杜甫在成都草堂时所作，描绘了春夜降雨的喜人景象，表达了诗人对春雨的喜爱之情。",
    ["春天","雨","杜甫","自然"],"杜甫诗选","primary","语文一年级下",
    ["春天","雨","杜甫"],"","ai_poem_034"))

add_poem(P("tang-035","绝句（两个黄