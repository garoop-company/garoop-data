-- ============================================================
-- New lesson data: chiho_sosei / finance / kosodate / startup10
-- Generated: 2026-04-22
-- parent_lesson: IDs 81–104 (4 topics × 6 locales)
-- branch_lesson: IDs 801–1040 (4 topics × 6 locales × 10 lessons)
-- ============================================================

SET NAMES utf8mb4;
SET time_zone = '+09:00';

-- ============================================================
-- parent_lesson
-- ============================================================

INSERT INTO `parent_lesson`
  (`id`, `title`, `level`, `locale`, `category`, `icon`, `type`, `order_num`, `disabled`, `insert_date`, `update_date`, `delete_flg`)
VALUES
-- 地方創生 / chiho_sosei
(81,  '地方創生',               '5', 'ja', 'contents', '', '0', 6, 0, NOW(), NOW(), 0),
(82,  'Regional Revitalization', '5', 'en', 'contents', '', '0', 6, 0, NOW(), NOW(), 0),
(83,  'Pembangunan Daerah',      '5', 'id', 'contents', '', '0', 6, 0, NOW(), NOW(), 0),
(84,  'Phát triển Địa phương',   '5', 'vi', 'contents', '', '0', 6, 0, NOW(), NOW(), 0),
(85,  '地方振兴',                '5', 'zh', 'contents', '', '0', 6, 0, NOW(), NOW(), 0),
(86,  'स्थानीय विकास',          '5', 'ne', 'contents', '', '0', 6, 0, NOW(), NOW(), 0),

-- お金と金融 / finance
(87,  'お金と金融',              '5', 'ja', 'AI', '', '0', 7, 0, NOW(), NOW(), 0),
(88,  'Money & Finance',         '5', 'en', 'AI', '', '0', 7, 0, NOW(), NOW(), 0),
(89,  'Uang & Keuangan',         '5', 'id', 'AI', '', '0', 7, 0, NOW(), NOW(), 0),
(90,  'Tiền & Tài chính',        '5', 'vi', 'AI', '', '0', 7, 0, NOW(), NOW(), 0),
(91,  '金钱与金融',              '5', 'zh', 'AI', '', '0', 7, 0, NOW(), NOW(), 0),
(92,  'पैसा र वित्त',            '5', 'ne', 'AI', '', '0', 7, 0, NOW(), NOW(), 0),

-- 子育て / kosodate
(93,  '子育て',                  '5', 'ja', 'contents', '', '0', 8, 0, NOW(), NOW(), 0),
(94,  'Parenting',               '5', 'en', 'contents', '', '0', 8, 0, NOW(), NOW(), 0),
(95,  'Pengasuhan Anak',         '5', 'id', 'contents', '', '0', 8, 0, NOW(), NOW(), 0),
(96,  'Nuôi dạy Con',            '5', 'vi', 'contents', '', '0', 8, 0, NOW(), NOW(), 0),
(97,  '育儿',                    '5', 'zh', 'contents', '', '0', 8, 0, NOW(), NOW(), 0),
(98,  'बाल पालनपोषण',           '5', 'ne', 'contents', '', '0', 8, 0, NOW(), NOW(), 0),

-- 10歳からの起業 / startup10
(99,  '10歳からの起業',          '5', 'ja', 'AI', '', '0', 9, 0, NOW(), NOW(), 0),
(100, 'Entrepreneurship for Kids','5', 'en', 'AI', '', '0', 9, 0, NOW(), NOW(), 0),
(101, 'Wirausaha untuk Anak',    '5', 'id', 'AI', '', '0', 9, 0, NOW(), NOW(), 0),
(102, 'Khởi nghiệp cho Trẻ em', '5', 'vi', 'AI', '', '0', 9, 0, NOW(), NOW(), 0),
(103, '少年创业',                '5', 'zh', 'AI', '', '0', 9, 0, NOW(), NOW(), 0),
(104, 'बालक उद्यमिता',          '5', 'ne', 'AI', '', '0', 9, 0, NOW(), NOW(), 0);


-- ============================================================
-- branch_lesson  (icon='' , level='1')
-- ============================================================

INSERT INTO `branch_lesson`
  (`id`, `parent_id`, `title`, `level`, `locale`, `icon`, `content_path`, `insert_date`, `update_date`, `delete_flg`)
VALUES

-- ------------------------------------------------
-- chiho_sosei: ja (parent 81) IDs 801-810
-- ------------------------------------------------
(801,  81, '地方創生ってなに？',           '1', 'ja', '', 'lesson-stories/ja/chiho_sosei_01.json', NOW(), NOW(), 0),
(802,  81, '人口減少問題',                 '1', 'ja', '', 'lesson-stories/ja/chiho_sosei_02.json', NOW(), NOW(), 0),
(803,  81, '農業DX',                       '1', 'ja', '', 'lesson-stories/ja/chiho_sosei_03.json', NOW(), NOW(), 0),
(804,  81, '観光で地域を元気に',           '1', 'ja', '', 'lesson-stories/ja/chiho_sosei_04.json', NOW(), NOW(), 0),
(805,  81, '移住・定住促進',               '1', 'ja', '', 'lesson-stories/ja/chiho_sosei_05.json', NOW(), NOW(), 0),
(806,  81, 'ローカルビジネス',             '1', 'ja', '', 'lesson-stories/ja/chiho_sosei_06.json', NOW(), NOW(), 0),
(807,  81, '地域特産品のブランディング',   '1', 'ja', '', 'lesson-stories/ja/chiho_sosei_07.json', NOW(), NOW(), 0),
(808,  81, '若者が変える地方',             '1', 'ja', '', 'lesson-stories/ja/chiho_sosei_08.json', NOW(), NOW(), 0),
(809,  81, 'スマートシティと地方',         '1', 'ja', '', 'lesson-stories/ja/chiho_sosei_09.json', NOW(), NOW(), 0),
(810,  81, 'みんなで作る地域の未来',       '1', 'ja', '', 'lesson-stories/ja/chiho_sosei_10.json', NOW(), NOW(), 0),

-- chiho_sosei: en (parent 82) IDs 811-820
(811,  82, 'What is Regional Revitalization?', '1', 'en', '', 'lesson-stories/en/chiho_sosei_01.json', NOW(), NOW(), 0),
(812,  82, 'Population Decline',               '1', 'en', '', 'lesson-stories/en/chiho_sosei_02.json', NOW(), NOW(), 0),
(813,  82, 'Agricultural DX',                  '1', 'en', '', 'lesson-stories/en/chiho_sosei_03.json', NOW(), NOW(), 0),
(814,  82, 'Tourism for Regional Vitality',    '1', 'en', '', 'lesson-stories/en/chiho_sosei_04.json', NOW(), NOW(), 0),
(815,  82, 'Promoting Migration & Settlement', '1', 'en', '', 'lesson-stories/en/chiho_sosei_05.json', NOW(), NOW(), 0),
(816,  82, 'Local Business',                   '1', 'en', '', 'lesson-stories/en/chiho_sosei_06.json', NOW(), NOW(), 0),
(817,  82, 'Branding Local Products',          '1', 'en', '', 'lesson-stories/en/chiho_sosei_07.json', NOW(), NOW(), 0),
(818,  82, 'Youth Changing the Region',        '1', 'en', '', 'lesson-stories/en/chiho_sosei_08.json', NOW(), NOW(), 0),
(819,  82, 'Smart City & Regions',             '1', 'en', '', 'lesson-stories/en/chiho_sosei_09.json', NOW(), NOW(), 0),
(820,  82, 'Our Regional Future Together',     '1', 'en', '', 'lesson-stories/en/chiho_sosei_10.json', NOW(), NOW(), 0),

-- chiho_sosei: id (parent 83) IDs 821-830
(821,  83, 'Apa itu Pembangunan Daerah?',    '1', 'id', '', 'lesson-stories/id/chiho_sosei_01.json', NOW(), NOW(), 0),
(822,  83, 'Penurunan Populasi',             '1', 'id', '', 'lesson-stories/id/chiho_sosei_02.json', NOW(), NOW(), 0),
(823,  83, 'Pertanian Digital',              '1', 'id', '', 'lesson-stories/id/chiho_sosei_03.json', NOW(), NOW(), 0),
(824,  83, 'Wisata untuk Daerah',            '1', 'id', '', 'lesson-stories/id/chiho_sosei_04.json', NOW(), NOW(), 0),
(825,  83, 'Promosi Migrasi',                '1', 'id', '', 'lesson-stories/id/chiho_sosei_05.json', NOW(), NOW(), 0),
(826,  83, 'Bisnis Lokal',                   '1', 'id', '', 'lesson-stories/id/chiho_sosei_06.json', NOW(), NOW(), 0),
(827,  83, 'Branding Produk Lokal',          '1', 'id', '', 'lesson-stories/id/chiho_sosei_07.json', NOW(), NOW(), 0),
(828,  83, 'Pemuda Mengubah Daerah',         '1', 'id', '', 'lesson-stories/id/chiho_sosei_08.json', NOW(), NOW(), 0),
(829,  83, 'Smart City untuk Daerah',        '1', 'id', '', 'lesson-stories/id/chiho_sosei_09.json', NOW(), NOW(), 0),
(830,  83, 'Masa Depan Daerah Bersama',      '1', 'id', '', 'lesson-stories/id/chiho_sosei_10.json', NOW(), NOW(), 0),

-- chiho_sosei: vi (parent 84) IDs 831-840
(831,  84, 'Phát triển địa phương là gì?',          '1', 'vi', '', 'lesson-stories/vi/chiho_sosei_01.json', NOW(), NOW(), 0),
(832,  84, 'Suy giảm Dân số',                       '1', 'vi', '', 'lesson-stories/vi/chiho_sosei_02.json', NOW(), NOW(), 0),
(833,  84, 'Nông nghiệp Số',                        '1', 'vi', '', 'lesson-stories/vi/chiho_sosei_03.json', NOW(), NOW(), 0),
(834,  84, 'Du lịch cho Địa phương',                '1', 'vi', '', 'lesson-stories/vi/chiho_sosei_04.json', NOW(), NOW(), 0),
(835,  84, 'Khuyến khích Di cư',                    '1', 'vi', '', 'lesson-stories/vi/chiho_sosei_05.json', NOW(), NOW(), 0),
(836,  84, 'Kinh doanh Địa phương',                 '1', 'vi', '', 'lesson-stories/vi/chiho_sosei_06.json', NOW(), NOW(), 0),
(837,  84, 'Thương hiệu Sản phẩm Địa phương',       '1', 'vi', '', 'lesson-stories/vi/chiho_sosei_07.json', NOW(), NOW(), 0),
(838,  84, 'Thanh niên Thay đổi Địa phương',        '1', 'vi', '', 'lesson-stories/vi/chiho_sosei_08.json', NOW(), NOW(), 0),
(839,  84, 'Thành phố Thông minh và Địa phương',    '1', 'vi', '', 'lesson-stories/vi/chiho_sosei_09.json', NOW(), NOW(), 0),
(840,  84, 'Tương lai Địa phương Cùng nhau',        '1', 'vi', '', 'lesson-stories/vi/chiho_sosei_10.json', NOW(), NOW(), 0),

-- chiho_sosei: zh (parent 85) IDs 841-850
(841,  85, '什么是地方振兴?',       '1', 'zh', '', 'lesson-stories/zh/chiho_sosei_01.json', NOW(), NOW(), 0),
(842,  85, '人口减少问题',           '1', 'zh', '', 'lesson-stories/zh/chiho_sosei_02.json', NOW(), NOW(), 0),
(843,  85, '农业数字化',             '1', 'zh', '', 'lesson-stories/zh/chiho_sosei_03.json', NOW(), NOW(), 0),
(844,  85, '旅游振兴地区',           '1', 'zh', '', 'lesson-stories/zh/chiho_sosei_04.json', NOW(), NOW(), 0),
(845,  85, '移居促进',               '1', 'zh', '', 'lesson-stories/zh/chiho_sosei_05.json', NOW(), NOW(), 0),
(846,  85, '本地商业',               '1', 'zh', '', 'lesson-stories/zh/chiho_sosei_06.json', NOW(), NOW(), 0),
(847,  85, '地方特产品牌化',         '1', 'zh', '', 'lesson-stories/zh/chiho_sosei_07.json', NOW(), NOW(), 0),
(848,  85, '青年改变地方',           '1', 'zh', '', 'lesson-stories/zh/chiho_sosei_08.json', NOW(), NOW(), 0),
(849,  85, '智慧城市与地方',         '1', 'zh', '', 'lesson-stories/zh/chiho_sosei_09.json', NOW(), NOW(), 0),
(850,  85, '共创地区未来',           '1', 'zh', '', 'lesson-stories/zh/chiho_sosei_10.json', NOW(), NOW(), 0),

-- chiho_sosei: ne (parent 86) IDs 851-860
(851,  86, 'स्थानीय विकास भनेको के?',   '1', 'ne', '', 'lesson-stories/ne/chiho_sosei_01.json', NOW(), NOW(), 0),
(852,  86, 'जनसंख्या ह्रास',            '1', 'ne', '', 'lesson-stories/ne/chiho_sosei_02.json', NOW(), NOW(), 0),
(853,  86, 'कृषि डिजिटलाइजेसन',        '1', 'ne', '', 'lesson-stories/ne/chiho_sosei_03.json', NOW(), NOW(), 0),
(854,  86, 'पर्यटनद्वारा क्षेत्र विकास', '1', 'ne', '', 'lesson-stories/ne/chiho_sosei_04.json', NOW(), NOW(), 0),
(855,  86, 'बसाइसराइ प्रोत्साहन',      '1', 'ne', '', 'lesson-stories/ne/chiho_sosei_05.json', NOW(), NOW(), 0),
(856,  86, 'स्थानीय व्यवसाय',          '1', 'ne', '', 'lesson-stories/ne/chiho_sosei_06.json', NOW(), NOW(), 0),
(857,  86, 'स्थानीय उत्पाद ब्रान्डिङ', '1', 'ne', '', 'lesson-stories/ne/chiho_sosei_07.json', NOW(), NOW(), 0),
(858,  86, 'युवाले बदल्दो क्षेत्र',    '1', 'ne', '', 'lesson-stories/ne/chiho_sosei_08.json', NOW(), NOW(), 0),
(859,  86, 'स्मार्ट सिटी र क्षेत्र',   '1', 'ne', '', 'lesson-stories/ne/chiho_sosei_09.json', NOW(), NOW(), 0),
(860,  86, 'सामूहिक क्षेत्रको भविष्य', '1', 'ne', '', 'lesson-stories/ne/chiho_sosei_10.json', NOW(), NOW(), 0),

-- ------------------------------------------------
-- finance: ja (parent 87) IDs 861-870
-- ------------------------------------------------
(861,  87, 'お金ってなに？',       '1', 'ja', '', 'lesson-stories/ja/finance_01.json', NOW(), NOW(), 0),
(862,  87, '貯金の力',             '1', 'ja', '', 'lesson-stories/ja/finance_02.json', NOW(), NOW(), 0),
(863,  87, '銀行の仕組み',         '1', 'ja', '', 'lesson-stories/ja/finance_03.json', NOW(), NOW(), 0),
(864,  87, '投資入門',             '1', 'ja', '', 'lesson-stories/ja/finance_04.json', NOW(), NOW(), 0),
(865,  87, '株式市場',             '1', 'ja', '', 'lesson-stories/ja/finance_05.json', NOW(), NOW(), 0),
(866,  87, '複利の魔法',           '1', 'ja', '', 'lesson-stories/ja/finance_06.json', NOW(), NOW(), 0),
(867,  87, '仮想通貨とWeb3',       '1', 'ja', '', 'lesson-stories/ja/finance_07.json', NOW(), NOW(), 0),
(868,  87, '税金と社会保障',       '1', 'ja', '', 'lesson-stories/ja/finance_08.json', NOW(), NOW(), 0),
(869,  87, '起業とお金',           '1', 'ja', '', 'lesson-stories/ja/finance_09.json', NOW(), NOW(), 0),
(870,  87, 'お金の未来',           '1', 'ja', '', 'lesson-stories/ja/finance_10.json', NOW(), NOW(), 0),

-- finance: en (parent 88) IDs 871-880
(871,  88, 'What is Money?',                  '1', 'en', '', 'lesson-stories/en/finance_01.json', NOW(), NOW(), 0),
(872,  88, 'The Power of Saving',             '1', 'en', '', 'lesson-stories/en/finance_02.json', NOW(), NOW(), 0),
(873,  88, 'How Banks Work',                  '1', 'en', '', 'lesson-stories/en/finance_03.json', NOW(), NOW(), 0),
(874,  88, 'Intro to Investing',              '1', 'en', '', 'lesson-stories/en/finance_04.json', NOW(), NOW(), 0),
(875,  88, 'Stock Market',                    '1', 'en', '', 'lesson-stories/en/finance_05.json', NOW(), NOW(), 0),
(876,  88, 'The Magic of Compound Interest',  '1', 'en', '', 'lesson-stories/en/finance_06.json', NOW(), NOW(), 0),
(877,  88, 'Crypto & Web3',                   '1', 'en', '', 'lesson-stories/en/finance_07.json', NOW(), NOW(), 0),
(878,  88, 'Taxes & Social Security',         '1', 'en', '', 'lesson-stories/en/finance_08.json', NOW(), NOW(), 0),
(879,  88, 'Business & Money',                '1', 'en', '', 'lesson-stories/en/finance_09.json', NOW(), NOW(), 0),
(880,  88, 'The Future of Money',             '1', 'en', '', 'lesson-stories/en/finance_10.json', NOW(), NOW(), 0),

-- finance: id (parent 89) IDs 881-890
(881,  89, 'Apa itu Uang?',              '1', 'id', '', 'lesson-stories/id/finance_01.json', NOW(), NOW(), 0),
(882,  89, 'Kekuatan Menabung',          '1', 'id', '', 'lesson-stories/id/finance_02.json', NOW(), NOW(), 0),
(883,  89, 'Cara Kerja Bank',            '1', 'id', '', 'lesson-stories/id/finance_03.json', NOW(), NOW(), 0),
(884,  89, 'Pengantar Investasi',        '1', 'id', '', 'lesson-stories/id/finance_04.json', NOW(), NOW(), 0),
(885,  89, 'Pasar Saham',                '1', 'id', '', 'lesson-stories/id/finance_05.json', NOW(), NOW(), 0),
(886,  89, 'Keajaiban Bunga Majemuk',    '1', 'id', '', 'lesson-stories/id/finance_06.json', NOW(), NOW(), 0),
(887,  89, 'Kripto & Web3',              '1', 'id', '', 'lesson-stories/id/finance_07.json', NOW(), NOW(), 0),
(888,  89, 'Pajak & Jaminan Sosial',     '1', 'id', '', 'lesson-stories/id/finance_08.json', NOW(), NOW(), 0),
(889,  89, 'Bisnis & Uang',              '1', 'id', '', 'lesson-stories/id/finance_09.json', NOW(), NOW(), 0),
(890,  89, 'Masa Depan Uang',            '1', 'id', '', 'lesson-stories/id/finance_10.json', NOW(), NOW(), 0),

-- finance: vi (parent 90) IDs 891-900
(891,  90, 'Tiền là gì?',                        '1', 'vi', '', 'lesson-stories/vi/finance_01.json', NOW(), NOW(), 0),
(892,  90, 'Sức mạnh của Tiết kiệm',             '1', 'vi', '', 'lesson-stories/vi/finance_02.json', NOW(), NOW(), 0),
(893,  90, 'Ngân hàng Hoạt động thế nào',        '1', 'vi', '', 'lesson-stories/vi/finance_03.json', NOW(), NOW(), 0),
(894,  90, 'Giới thiệu Đầu tư',                  '1', 'vi', '', 'lesson-stories/vi/finance_04.json', NOW(), NOW(), 0),
(895,  90, 'Thị trường Chứng khoán',             '1', 'vi', '', 'lesson-stories/vi/finance_05.json', NOW(), NOW(), 0),
(896,  90, 'Ma thuật Lãi kép',                   '1', 'vi', '', 'lesson-stories/vi/finance_06.json', NOW(), NOW(), 0),
(897,  90, 'Tiền điện tử & Web3',                '1', 'vi', '', 'lesson-stories/vi/finance_07.json', NOW(), NOW(), 0),
(898,  90, 'Thuế & An sinh Xã hội',              '1', 'vi', '', 'lesson-stories/vi/finance_08.json', NOW(), NOW(), 0),
(899,  90, 'Kinh doanh & Tiền',                  '1', 'vi', '', 'lesson-stories/vi/finance_09.json', NOW(), NOW(), 0),
(900,  90, 'Tương lai của Tiền',                 '1', 'vi', '', 'lesson-stories/vi/finance_10.json', NOW(), NOW(), 0),

-- finance: zh (parent 91) IDs 901-910
(901,  91, '什么是钱?',         '1', 'zh', '', 'lesson-stories/zh/finance_01.json', NOW(), NOW(), 0),
(902,  91, '储蓄的力量',         '1', 'zh', '', 'lesson-stories/zh/finance_02.json', NOW(), NOW(), 0),
(903,  91, '银行的运作',         '1', 'zh', '', 'lesson-stories/zh/finance_03.json', NOW(), NOW(), 0),
(904,  91, '投资入门',           '1', 'zh', '', 'lesson-stories/zh/finance_04.json', NOW(), NOW(), 0),
(905,  91, '股票市场',           '1', 'zh', '', 'lesson-stories/zh/finance_05.json', NOW(), NOW(), 0),
(906,  91, '复利的魔法',         '1', 'zh', '', 'lesson-stories/zh/finance_06.json', NOW(), NOW(), 0),
(907,  91, '加密货币与Web3',     '1', 'zh', '', 'lesson-stories/zh/finance_07.json', NOW(), NOW(), 0),
(908,  91, '税收与社会保障',     '1', 'zh', '', 'lesson-stories/zh/finance_08.json', NOW(), NOW(), 0),
(909,  91, '创业与金钱',         '1', 'zh', '', 'lesson-stories/zh/finance_09.json', NOW(), NOW(), 0),
(910,  91, '金钱的未来',         '1', 'zh', '', 'lesson-stories/zh/finance_10.json', NOW(), NOW(), 0),

-- finance: ne (parent 92) IDs 911-920
(911,  92, 'पैसा भनेको के?',         '1', 'ne', '', 'lesson-stories/ne/finance_01.json', NOW(), NOW(), 0),
(912,  92, 'बचतको शक्ति',           '1', 'ne', '', 'lesson-stories/ne/finance_02.json', NOW(), NOW(), 0),
(913,  92, 'बैंक कसरी काम गर्छ?',   '1', 'ne', '', 'lesson-stories/ne/finance_03.json', NOW(), NOW(), 0),
(914,  92, 'लगानीको परिचय',         '1', 'ne', '', 'lesson-stories/ne/finance_04.json', NOW(), NOW(), 0),
(915,  92, 'शेयर बजार',             '1', 'ne', '', 'lesson-stories/ne/finance_05.json', NOW(), NOW(), 0),
(916,  92, 'चक्रवृद्धि ब्याजको जादू','1', 'ne', '', 'lesson-stories/ne/finance_06.json', NOW(), NOW(), 0),
(917,  92, 'क्रिप्टो र Web3',        '1', 'ne', '', 'lesson-stories/ne/finance_07.json', NOW(), NOW(), 0),
(918,  92, 'कर र सामाजिक सुरक्षा',  '1', 'ne', '', 'lesson-stories/ne/finance_08.json', NOW(), NOW(), 0),
(919,  92, 'व्यवसाय र पैसा',         '1', 'ne', '', 'lesson-stories/ne/finance_09.json', NOW(), NOW(), 0),
(920,  92, 'पैसाको भविष्य',          '1', 'ne', '', 'lesson-stories/ne/finance_10.json', NOW(), NOW(), 0),

-- ------------------------------------------------
-- kosodate: ja (parent 93) IDs 921-930
-- ------------------------------------------------
(921,  93, '子育ての第一歩',           '1', 'ja', '', 'lesson-stories/ja/kosodate_01.json', NOW(), NOW(), 0),
(922,  93, '0〜3歳の脳発達',          '1', 'ja', '', 'lesson-stories/ja/kosodate_02.json', NOW(), NOW(), 0),
(923,  93, '遊びが最高の学び',         '1', 'ja', '', 'lesson-stories/ja/kosodate_03.json', NOW(), NOW(), 0),
(924,  93, '食育',                     '1', 'ja', '', 'lesson-stories/ja/kosodate_04.json', NOW(), NOW(), 0),
(925,  93, '感情教育と共感力',         '1', 'ja', '', 'lesson-stories/ja/kosodate_05.json', NOW(), NOW(), 0),
(926,  93, 'デジタル時代の子育て',     '1', 'ja', '', 'lesson-stories/ja/kosodate_06.json', NOW(), NOW(), 0),
(927,  93, 'グローバル時代の子育て',   '1', 'ja', '', 'lesson-stories/ja/kosodate_07.json', NOW(), NOW(), 0),
(928,  93, '運動と子供の発達',         '1', 'ja', '', 'lesson-stories/ja/kosodate_08.json', NOW(), NOW(), 0),
(929,  93, '地方×子育て',             '1', 'ja', '', 'lesson-stories/ja/kosodate_09.json', NOW(), NOW(), 0),
(930,  93, '子育ての未来',             '1', 'ja', '', 'lesson-stories/ja/kosodate_10.json', NOW(), NOW(), 0),

-- kosodate: en (parent 94) IDs 931-940
(931,  94, 'First Steps of Parenting',        '1', 'en', '', 'lesson-stories/en/kosodate_01.json', NOW(), NOW(), 0),
(932,  94, 'Brain Development 0-3',           '1', 'en', '', 'lesson-stories/en/kosodate_02.json', NOW(), NOW(), 0),
(933,  94, 'Play is the Best Learning',       '1', 'en', '', 'lesson-stories/en/kosodate_03.json', NOW(), NOW(), 0),
(934,  94, 'Food Education',                  '1', 'en', '', 'lesson-stories/en/kosodate_04.json', NOW(), NOW(), 0),
(935,  94, 'Emotional Education & Empathy',   '1', 'en', '', 'lesson-stories/en/kosodate_05.json', NOW(), NOW(), 0),
(936,  94, 'Parenting in the Digital Age',    '1', 'en', '', 'lesson-stories/en/kosodate_06.json', NOW(), NOW(), 0),
(937,  94, 'Parenting in the Global Age',     '1', 'en', '', 'lesson-stories/en/kosodate_07.json', NOW(), NOW(), 0),
(938,  94, 'Exercise & Child Development',    '1', 'en', '', 'lesson-stories/en/kosodate_08.json', NOW(), NOW(), 0),
(939,  94, 'Region × Parenting',              '1', 'en', '', 'lesson-stories/en/kosodate_09.json', NOW(), NOW(), 0),
(940,  94, 'The Future of Parenting',         '1', 'en', '', 'lesson-stories/en/kosodate_10.json', NOW(), NOW(), 0),

-- kosodate: id (parent 95) IDs 941-950
(941,  95, 'Langkah Pertama Parenting',       '1', 'id', '', 'lesson-stories/id/kosodate_01.json', NOW(), NOW(), 0),
(942,  95, 'Perkembangan Otak 0-3',           '1', 'id', '', 'lesson-stories/id/kosodate_02.json', NOW(), NOW(), 0),
(943,  95, 'Bermain adalah Belajar Terbaik',  '1', 'id', '', 'lesson-stories/id/kosodate_03.json', NOW(), NOW(), 0),
(944,  95, 'Pendidikan Gizi',                 '1', 'id', '', 'lesson-stories/id/kosodate_04.json', NOW(), NOW(), 0),
(945,  95, 'Pendidikan Emosional & Empati',   '1', 'id', '', 'lesson-stories/id/kosodate_05.json', NOW(), NOW(), 0),
(946,  95, 'Parenting di Era Digital',        '1', 'id', '', 'lesson-stories/id/kosodate_06.json', NOW(), NOW(), 0),
(947,  95, 'Parenting di Era Global',         '1', 'id', '', 'lesson-stories/id/kosodate_07.json', NOW(), NOW(), 0),
(948,  95, 'Olahraga & Perkembangan Anak',    '1', 'id', '', 'lesson-stories/id/kosodate_08.json', NOW(), NOW(), 0),
(949,  95, 'Daerah × Parenting',              '1', 'id', '', 'lesson-stories/id/kosodate_09.json', NOW(), NOW(), 0),
(950,  95, 'Masa Depan Parenting',            '1', 'id', '', 'lesson-stories/id/kosodate_10.json', NOW(), NOW(), 0),

-- kosodate: vi (parent 96) IDs 951-960
(951,  96, 'Bước đầu Nuôi dạy Con',              '1', 'vi', '', 'lesson-stories/vi/kosodate_01.json', NOW(), NOW(), 0),
(952,  96, 'Não bộ 0-3 Tuổi',                    '1', 'vi', '', 'lesson-stories/vi/kosodate_02.json', NOW(), NOW(), 0),
(953,  96, 'Chơi là Học tốt nhất',               '1', 'vi', '', 'lesson-stories/vi/kosodate_03.json', NOW(), NOW(), 0),
(954,  96, 'Giáo dục Dinh dưỡng',                '1', 'vi', '', 'lesson-stories/vi/kosodate_04.json', NOW(), NOW(), 0),
(955,  96, 'Giáo dục Cảm xúc & Đồng cảm',       '1', 'vi', '', 'lesson-stories/vi/kosodate_05.json', NOW(), NOW(), 0),
(956,  96, 'Nuôi con trong Thời đại Số',          '1', 'vi', '', 'lesson-stories/vi/kosodate_06.json', NOW(), NOW(), 0),
(957,  96, 'Nuôi con trong Thời đại Toàn cầu',   '1', 'vi', '', 'lesson-stories/vi/kosodate_07.json', NOW(), NOW(), 0),
(958,  96, 'Vận động & Phát triển Trẻ',           '1', 'vi', '', 'lesson-stories/vi/kosodate_08.json', NOW(), NOW(), 0),
(959,  96, 'Địa phương × Nuôi con',              '1', 'vi', '', 'lesson-stories/vi/kosodate_09.json', NOW(), NOW(), 0),
(960,  96, 'Tương lai Nuôi dạy Con',             '1', 'vi', '', 'lesson-stories/vi/kosodate_10.json', NOW(), NOW(), 0),

-- kosodate: zh (parent 97) IDs 961-970
(961,  97, '育儿第一步',             '1', 'zh', '', 'lesson-stories/zh/kosodate_01.json', NOW(), NOW(), 0),
(962,  97, '0-3岁大脑发育',          '1', 'zh', '', 'lesson-stories/zh/kosodate_02.json', NOW(), NOW(), 0),
(963,  97, '玩耍是最好的学习',       '1', 'zh', '', 'lesson-stories/zh/kosodate_03.json', NOW(), NOW(), 0),
(964,  97, '饮食教育',               '1', 'zh', '', 'lesson-stories/zh/kosodate_04.json', NOW(), NOW(), 0),
(965,  97, '情感教育与共情力',       '1', 'zh', '', 'lesson-stories/zh/kosodate_05.json', NOW(), NOW(), 0),
(966,  97, '数字时代的育儿',         '1', 'zh', '', 'lesson-stories/zh/kosodate_06.json', NOW(), NOW(), 0),
(967,  97, '全球化时代的育儿',       '1', 'zh', '', 'lesson-stories/zh/kosodate_07.json', NOW(), NOW(), 0),
(968,  97, '运动与儿童发育',         '1', 'zh', '', 'lesson-stories/zh/kosodate_08.json', NOW(), NOW(), 0),
(969,  97, '地方×育儿',             '1', 'zh', '', 'lesson-stories/zh/kosodate_09.json', NOW(), NOW(), 0),
(970,  97, '育儿的未来',             '1', 'zh', '', 'lesson-stories/zh/kosodate_10.json', NOW(), NOW(), 0),

-- kosodate: ne (parent 98) IDs 971-980
(971,  98, 'बाल पालनको पहिलो कदम',     '1', 'ne', '', 'lesson-stories/ne/kosodate_01.json', NOW(), NOW(), 0),
(972,  98, '०-३ वर्षमा मस्तिष्क विकास','1', 'ne', '', 'lesson-stories/ne/kosodate_02.json', NOW(), NOW(), 0),
(973,  98, 'खेल नै सर्वोत्तम सिकाइ',   '1', 'ne', '', 'lesson-stories/ne/kosodate_03.json', NOW(), NOW(), 0),
(974,  98, 'खाद्य शिक्षा',             '1', 'ne', '', 'lesson-stories/ne/kosodate_04.json', NOW(), NOW(), 0),
(975,  98, 'भावनात्मक शिक्षा र सहानुभूति','1', 'ne', '', 'lesson-stories/ne/kosodate_05.json', NOW(), NOW(), 0),
(976,  98, 'डिजिटल युगमा बाल पालन',    '1', 'ne', '', 'lesson-stories/ne/kosodate_06.json', NOW(), NOW(), 0),
(977,  98, 'वैश्विक युगमा बाल पालन',   '1', 'ne', '', 'lesson-stories/ne/kosodate_07.json', NOW(), NOW(), 0),
(978,  98, 'व्यायाम र बाल विकास',       '1', 'ne', '', 'lesson-stories/ne/kosodate_08.json', NOW(), NOW(), 0),
(979,  98, 'क्षेत्र × बाल पालन',        '1', 'ne', '', 'lesson-stories/ne/kosodate_09.json', NOW(), NOW(), 0),
(980,  98, 'बाल पालनको भविष्य',         '1', 'ne', '', 'lesson-stories/ne/kosodate_10.json', NOW(), NOW(), 0),

-- ------------------------------------------------
-- startup10: ja (parent 99) IDs 981-990
-- ------------------------------------------------
(981,  99,  '10歳でできること',         '1', 'ja', '', 'lesson-stories/ja/startup10_01.json', NOW(), NOW(), 0),
(982,  99,  'アイデアの見つけ方',       '1', 'ja', '', 'lesson-stories/ja/startup10_02.json', NOW(), NOW(), 0),
(983,  99,  'MVPを作ろう',             '1', 'ja', '', 'lesson-stories/ja/startup10_03.json', NOW(), NOW(), 0),
(984,  99,  'お客様を知ろう',           '1', 'ja', '', 'lesson-stories/ja/startup10_04.json', NOW(), NOW(), 0),
(985,  99,  'ピッチの練習',             '1', 'ja', '', 'lesson-stories/ja/startup10_05.json', NOW(), NOW(), 0),
(986,  99,  'チームを作ろう',           '1', 'ja', '', 'lesson-stories/ja/startup10_06.json', NOW(), NOW(), 0),
(987,  99,  '失敗から学ぶ',             '1', 'ja', '', 'lesson-stories/ja/startup10_07.json', NOW(), NOW(), 0),
(988,  99,  'デジタルツールで起業',     '1', 'ja', '', 'lesson-stories/ja/startup10_08.json', NOW(), NOW(), 0),
(989,  99,  '地域から世界へ',           '1', 'ja', '', 'lesson-stories/ja/startup10_09.json', NOW(), NOW(), 0),
(990,  99,  '未来の起業家へ',           '1', 'ja', '', 'lesson-stories/ja/startup10_10.json', NOW(), NOW(), 0),

-- startup10: en (parent 100) IDs 991-1000
(991,  100, 'What Kids Can Do at 10',           '1', 'en', '', 'lesson-stories/en/startup10_01.json', NOW(), NOW(), 0),
(992,  100, 'How to Find Ideas',                '1', 'en', '', 'lesson-stories/en/startup10_02.json', NOW(), NOW(), 0),
(993,  100, "Let's Build an MVP",               '1', 'en', '', 'lesson-stories/en/startup10_03.json', NOW(), NOW(), 0),
(994,  100, 'Know Your Customer',               '1', 'en', '', 'lesson-stories/en/startup10_04.json', NOW(), NOW(), 0),
(995,  100, 'Pitch Practice',                   '1', 'en', '', 'lesson-stories/en/startup10_05.json', NOW(), NOW(), 0),
(996,  100, 'Build a Team',                     '1', 'en', '', 'lesson-stories/en/startup10_06.json', NOW(), NOW(), 0),
(997,  100, 'Learning from Failure',            '1', 'en', '', 'lesson-stories/en/startup10_07.json', NOW(), NOW(), 0),
(998,  100, 'Starting Up with Digital Tools',   '1', 'en', '', 'lesson-stories/en/startup10_08.json', NOW(), NOW(), 0),
(999,  100, 'From Local to Global',             '1', 'en', '', 'lesson-stories/en/startup10_09.json', NOW(), NOW(), 0),
(1000, 100, 'To Future Entrepreneurs',          '1', 'en', '', 'lesson-stories/en/startup10_10.json', NOW(), NOW(), 0),

-- startup10: id (parent 101) IDs 1001-1010
(1001, 101, 'Yang Bisa Dilakukan di Usia 10',    '1', 'id', '', 'lesson-stories/id/startup10_01.json', NOW(), NOW(), 0),
(1002, 101, 'Cara Menemukan Ide',                '1', 'id', '', 'lesson-stories/id/startup10_02.json', NOW(), NOW(), 0),
(1003, 101, 'Mari Buat MVP',                     '1', 'id', '', 'lesson-stories/id/startup10_03.json', NOW(), NOW(), 0),
(1004, 101, 'Kenali Pelangganmu',                '1', 'id', '', 'lesson-stories/id/startup10_04.json', NOW(), NOW(), 0),
(1005, 101, 'Latihan Pitch',                     '1', 'id', '', 'lesson-stories/id/startup10_05.json', NOW(), NOW(), 0),
(1006, 101, 'Bangun Tim',                        '1', 'id', '', 'lesson-stories/id/startup10_06.json', NOW(), NOW(), 0),
(1007, 101, 'Belajar dari Kegagalan',            '1', 'id', '', 'lesson-stories/id/startup10_07.json', NOW(), NOW(), 0),
(1008, 101, 'Berwirausaha dengan Alat Digital',  '1', 'id', '', 'lesson-stories/id/startup10_08.json', NOW(), NOW(), 0),
(1009, 101, 'Dari Lokal ke Global',              '1', 'id', '', 'lesson-stories/id/startup10_09.json', NOW(), NOW(), 0),
(1010, 101, 'Untuk Wirausahawan Masa Depan',     '1', 'id', '', 'lesson-stories/id/startup10_10.json', NOW(), NOW(), 0),

-- startup10: vi (parent 102) IDs 1011-1020
(1011, 102, 'Những gì Trẻ 10 tuổi có thể làm',   '1', 'vi', '', 'lesson-stories/vi/startup10_01.json', NOW(), NOW(), 0),
(1012, 102, 'Cách tìm ý tưởng',                   '1', 'vi', '', 'lesson-stories/vi/startup10_02.json', NOW(), NOW(), 0),
(1013, 102, 'Hãy Xây dựng MVP',                   '1', 'vi', '', 'lesson-stories/vi/startup10_03.json', NOW(), NOW(), 0),
(1014, 102, 'Hiểu Khách hàng',                    '1', 'vi', '', 'lesson-stories/vi/startup10_04.json', NOW(), NOW(), 0),
(1015, 102, 'Luyện Pitch',                         '1', 'vi', '', 'lesson-stories/vi/startup10_05.json', NOW(), NOW(), 0),
(1016, 102, 'Xây dựng Nhóm',                      '1', 'vi', '', 'lesson-stories/vi/startup10_06.json', NOW(), NOW(), 0),
(1017, 102, 'Học từ Thất bại',                    '1', 'vi', '', 'lesson-stories/vi/startup10_07.json', NOW(), NOW(), 0),
(1018, 102, 'Khởi nghiệp với Công cụ Số',         '1', 'vi', '', 'lesson-stories/vi/startup10_08.json', NOW(), NOW(), 0),
(1019, 102, 'Từ Địa phương đến Toàn cầu',         '1', 'vi', '', 'lesson-stories/vi/startup10_09.json', NOW(), NOW(), 0),
(1020, 102, 'Cho các Doanh nhân Tương lai',        '1', 'vi', '', 'lesson-stories/vi/startup10_10.json', NOW(), NOW(), 0),

-- startup10: zh (parent 103) IDs 1021-1030
(1021, 103, '10岁能做的事',         '1', 'zh', '', 'lesson-stories/zh/startup10_01.json', NOW(), NOW(), 0),
(1022, 103, '如何找到创意',         '1', 'zh', '', 'lesson-stories/zh/startup10_02.json', NOW(), NOW(), 0),
(1023, 103, '打造MVP',              '1', 'zh', '', 'lesson-stories/zh/startup10_03.json', NOW(), NOW(), 0),
(1024, 103, '了解你的客户',         '1', 'zh', '', 'lesson-stories/zh/startup10_04.json', NOW(), NOW(), 0),
(1025, 103, '练习路演',             '1', 'zh', '', 'lesson-stories/zh/startup10_05.json', NOW(), NOW(), 0),
(1026, 103, '组建团队',             '1', 'zh', '', 'lesson-stories/zh/startup10_06.json', NOW(), NOW(), 0),
(1027, 103, '从失败中学习',         '1', 'zh', '', 'lesson-stories/zh/startup10_07.json', NOW(), NOW(), 0),
(1028, 103, '数字工具创业',         '1', 'zh', '', 'lesson-stories/zh/startup10_08.json', NOW(), NOW(), 0),
(1029, 103, '从地方走向世界',       '1', 'zh', '', 'lesson-stories/zh/startup10_09.json', NOW(), NOW(), 0),
(1030, 103, '致未来的创业者',       '1', 'zh', '', 'lesson-stories/zh/startup10_10.json', NOW(), NOW(), 0),

-- startup10: ne (parent 104) IDs 1031-1040
(1031, 104, '१० वर्षमा के गर्न सकिन्छ?',  '1', 'ne', '', 'lesson-stories/ne/startup10_01.json', NOW(), NOW(), 0),
(1032, 104, 'विचार कसरी खोज्ने?',         '1', 'ne', '', 'lesson-stories/ne/startup10_02.json', NOW(), NOW(), 0),
(1033, 104, 'MVP बनाऔं',                   '1', 'ne', '', 'lesson-stories/ne/startup10_03.json', NOW(), NOW(), 0),
(1034, 104, 'ग्राहकलाई चिनौं',            '1', 'ne', '', 'lesson-stories/ne/startup10_04.json', NOW(), NOW(), 0),
(1035, 104, 'पिच अभ्यास',                  '1', 'ne', '', 'lesson-stories/ne/startup10_05.json', NOW(), NOW(), 0),
(1036, 104, 'टिम बनाऔं',                   '1', 'ne', '', 'lesson-stories/ne/startup10_06.json', NOW(), NOW(), 0),
(1037, 104, 'असफलताबाट सिक्नु',           '1', 'ne', '', 'lesson-stories/ne/startup10_07.json', NOW(), NOW(), 0),
(1038, 104, 'डिजिटल उपकरणले उद्यम',       '1', 'ne', '', 'lesson-stories/ne/startup10_08.json', NOW(), NOW(), 0),
(1039, 104, 'स्थानीयबाट विश्वमा',          '1', 'ne', '', 'lesson-stories/ne/startup10_09.json', NOW(), NOW(), 0),
(1040, 104, 'भावी उद्यमीहरूमा',            '1', 'ne', '', 'lesson-stories/ne/startup10_10.json', NOW(), NOW(), 0);
