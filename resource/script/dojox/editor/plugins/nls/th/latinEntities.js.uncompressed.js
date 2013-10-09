define(
"dojox/editor/plugins/nls/th/latinEntities", ({
	/* These are already handled in the default RTE
	amp:"ampersand",lt:"less-than sign",
	gt:"greater-than sign",
	nbsp:"no-break space\nnon-breaking space",
	quot:"quote",
	*/
	iexcl:"เครื่องหมายอัศเจรีย์กลับหัว",
	cent:"เครื่องหมายเซ็นต์",
	pound:"เครื่องหมายปอนด์",
	curren:"เครื่องหมายสกุลเงิน",
	yen:"เครื่องหมาย เยน\nเครื่องหมาย หยวน",
	brvbar:" แถบแยก\nแถบแยกแนวตั้ง",
	sect:"เครื่องหมายแบ่งส่วน",
	uml:"diaeresis\nspacing diaeresis",
	copy:"เครื่องหมายลิขสิทธิ์",
	ordf:"ตังบ่งชี้ลำดับของผู้หญิง",
	laquo:"เครื่องหมายคำพูดที่ชี้ไปทางซ้าย\nอัญประกาศที่ชี้ไปทางซ้าย   ",
	not:"ลัญลักษณ์ น็อท",
	shy:"ซอร์ฟไฮเฟน\nไฮเฟนการตัดสินใจ",
	reg:"สัญญลักษณ์การจดทะเบียน\nสัญญลักษณ์เครื่องหมายการค้าจดทะเบียน",
	macr:"มาครอน\nมาครอนการเว้นช่องว่าง\nโอเวอร์ไลน์\nAPL โอเวอร์บาร์",
	deg:"สัญลักษณ์องศา",
	plusmn:"เครื่องหมายบวก-ลบ\nเครื่องหมายบวก-หรือ-ลบ",
	sup2:"ตัวยกสอง\nตัวยกเลขสอง\nสแควร์",
	sup3:"ตัวยกสาม\nตัวยกเลขสาม\nคิวบ์",
	acute:"acute accent\nช่องว่างของอคิวท์",
	micro:"เครื่องหมายไมโคร",
	para:"เครื่องหมาย pilcrow\nเครื่องหมายย่อหน้า",
	middot:"จุดกึ่งกลาง\nคอมม่าGeorgian\nจุดกึ่งกลางภาษากรีก",
	cedil:"cedilla\ncedilla ช่องว่าง",
	sup1:" ตัวยกหนึ่ง\nตัวยกหลักหนึ่ง",
	ordm:"ตัวบ่งชี้ลำดับของผู้ชาย",
	raquo:"เครื่องหมายคำพูดที่ชี้ไปทางขวา\nguillemet ที่ชี้ไปทางขวา",
	frac14:"  เศษหนึ่งส่วนสี่แบบหยาบๆ\nเศษหนึ่งส่วนสี่",
	frac12:" เศษหนึ่งส่วนสองแบบหยาบๆ\nเศษหนึ่งส่วนสอง",
	frac34:"    เศษสามส่วนสี่แบบหยาบๆ\nเศษสามส่วนสี่",
	iquest:" เครื่องหมายคำถามกลับหัว\nเครื่องหมายคำถามกลับหัว",
	Agrave:" อักษร A ตัวใหญ่ภาษาละตินที่มีเครื่องหมายกราฟอักษร\n A ตัวใหญ่ภาษาละตินที่มีเครื่องหมายกราฟ",
	Aacute:"อักษรละติน A ตัวใหญ่ พร้อมเครื่องหมายอคิวท์",
	Acirc:"อักษรละติน A ตัวใหญ่ที่มีเครื่องหมายเซอร์คัมเฟลกซ์",
	Atilde:"อักษรละติน A ตัวใหญ่ที่มีเครื่องหมายทิลเดอ",
	Auml:"อักษรละติน A ตัวใหญ่ที่มีเครื่องหมายไดเอเรซิส",
	Aring:" อักษรละติน A ตัวใหญ่ที่มีเครื่องหมายวงแหวนด้านบน\nอักษรละติน A ตัวใหญ่ที่มีเครื่องหมายวงแหวน",
	AElig:"อักษรละติน AE ตัวใหญ่อักษรละติน\nAE ตัวใหญ่ที่ติดกัน",
	Ccedil:"อักษรละติน C ตัวใหญ่ที่มีเครื่องหมายซีดิลลา",
	Egrave:"อักษรละติน E ตัวใหญ่ที่มีเครื่องหมายกราฟ",
	Eacute:"อักษรละติน E ตัวใหญ่ที่มีเครื่องหมายอคิวท์",
	Ecirc:"อักษรละติน E ตัวใหญ่ที่มีเครื่องหมายเซอร์คัมเฟลกซ์",
	Euml:"อักษรละติน E ตัวใหญ่ที่มีเครื่องหมายไดเอเรซิส",
	Igrave:"อักษรละติน I ตัวใหญ่ที่มีเครื่องหมายกราฟ",
	Iacute:"อักษรละติน I ตัวใหญ่ที่มีเครื่องหมายอคิวท์",
	Icirc:"อักษรละติน I ตัวใหญ่ที่มีเครื่องหมายเซอร์คัมเฟลกซ์",
	Iuml:"อักษรละติน I ตัวใหญ่ที่มีเครื่องหมายไดเอเรซิส",
	ETH:"อักษรละติน ETH ตัวใหญ่",
	Ntilde:"อักษรละติน N ตัวใหญ่ที่มีเครื่องหมายทิลเดอ",
	Ograve:"อักษรละติน O ตัวใหญ่ที่มีเครื่องหมายกราฟ",
	Oacute:"อักษรละติน O ตัวใหญ่ที่มีเครื่องหมายอคิวท์",
	Ocirc:"อักษรละติน O ตัวใหญ่ที่มีเครื่องหมายเซอร์คัมเฟลก",
	Otilde:"อักษรละติน O ตัวใหญ่ที่มีเครื่องหมายทิลเดอ",
	Ouml:"อักษรละติน O ตัวใหญ่ที่มีเครื่องหมายไดเอเรซิส",
	times:"เครื่องหมายคูณ",
	Oslash:" อักษรละติน O ตัวใหญ่ที่มีเครื่องหมายแลชกษรละติน O ตัวใหญ่ที่มีเครื่องหมายสแลช",
	Ugrave:"อักษรละติน U ตัวใหญ่ที่มีเครื่องหมายกราฟ",
	Uacute:"อักษรละติน U ตัวใหญ่ที่มีเครื่องหมายอคิวท์",
	Ucirc:"อักษรละติน U ตัวใหญ่ที่มีเครื่องหมายเซอร์คัมเฟลกซ์",
	Uuml:"อักษรละติน U ตัวใหญ่ที่มีเครื่องหมายไดเอเรซิส",
	Yacute:"อักษรละติน Y ตัวใหญ่ที่มีเครื่องหมายอคิวท์",
	THORN:"อักษรละติน THORN ตัวใหญ่",
	szlig:" อักษร sharp s ตัวเล็กภาษาละตินess-zed",
	agrave:"อักษร a ตัวเล็กภาษาละตินที่มีเครื่องหมายกราฟอักษร a ตัวเล็กภาษาละตินที่มีเครื่องหมายกราฟ",
	aacute:"อักษร a ตัวเล็กภาษาละตินที่มีเครื่องหมายอคิวท์",
	acirc:"อักษร a ตัวเล็กภาษาละตินที่มีเครื่องหมายเซอร์คัมเฟลกซ์",
	atilde:"อักษร a ตัวเล็กภาษาละตินที่มีเครื่องหมายทิลเดอ",
	auml:"อักษร a ตัวเล็กภาษาละตินที่มีเครื่องหมายไดเอเรซิส",
	aring:"อักษร a ตัวเล็กภาษาละตินที่มีวงแหวนข้างบน\nอักษร a ตัวเล็กภาษาละตินที่มีวงแหวน",
	aelig:"อักษร ae ตัวเล็กภาษาละติน\nอักษร ae ตัวเล็กภาษาละตินที่ติดกัน",
	ccedil:"อักษร c ตัวเล็กภาษาละตินที่มีเครื่องหมายซีดิลลา",
	egrave:"อักษร c ตัวเล็กภาษาละตินที่มีเครื่องหมายกราฟ",
	eacute:"อักษร c ตัวเล็กภาษาละตินที่มีเครื่องหมายอคิวท์",
	ecirc:"อักษร e ตัวเล็กภาษาละตินที่มีเครื่องหมายเซอร์คัมเฟลก",
	euml:"อักษร e ตัวเล็กภาษาละตินที่มีเครื่องหมายไดเอเรซิส",
	igrave:"อักษร i ตัวเล็กภาษาละตินที่มีเครื่องหมายกราฟ",
	iacute:"อักษร i ตัวเล็กภาษาละตินที่มีเครื่องหมายอคิวท์",
	icirc:"อักษร i ตัวเล็กภาษาละตินที่มีเครื่องหมายเซอร์คัมเฟลกซ์",
	iuml:"อักษร i ตัวเล็กภาษาละตินที่มีเครื่องหมายไดเอเรซิส",
	eth:"อักษร eth ตัวเล็กภาษาละติน",
	ntilde:"อักษร n ตัวเล็กภาษาละตินที่มีเครื่องหมายทิลเดอ",
	ograve:"อักษร o ตัวเล็กภาษาละตินที่มีเครื่องหมายกราฟ",
	oacute:"อักษร o ตัวเล็กภาษาละตินที่มีเครื่องหมายอคิวท์",
	ocirc:"อักษร o ตัวเล็กภาษาละตินที่มีเครื่องหมายเซอร์คัมเฟลกซ์",
	otilde:"อักษร o ตัวเล็กภาษาละตินที่มีเครื่องหมายทิลเดอ",
	ouml:"อักษร o ตัวเล็กภาษาละตินที่มีเครื่องหมายไดเอเรซิส",
	divide:"เครื่องหมายหาร",
	oslash:" อักษรละติน o ตัวเล็กที่มีเครื่องหมายแลช\nอักษรละติน o ตัวเล็กที่มีเครื่องหมายสแลช",
	ugrave:"อักษร u ตัวเล็กภาษาละตินที่มีเครื่องหมายกราฟ",
	uacute:"อักษร u ตัวเล็กภาษาละตินที่มีเครื่องหมายอคิวท์",
	ucirc:"อักษร u ตัวเล็กภาษาละตินที่มีเครื่องหมายเซอร์คัมเฟลกซ์",
	uuml:"อักษร u ตัวเล็กภาษาละตินที่มีเครื่องหมายไดเอเรซิส",
	yacute:"อักษร y ตัวเล็กภาษาละตินที่มีเครื่องหมายอคิวท์",
	thorn:"อักษร thorn ตัวเล็กภาษาละติน",
	yuml:"อักษร y ตัวเล็กภาษาละตินที่มีเครื่องหมายไดเอเรซิส",
// Greek Characters and Symbols
	fnof:"   อักษร f ตัวเล็กภาษาละตินที่มีห่วงฟังก์ชันflorin",
	Alpha:"อักษรอัลฟาตัวใหญ่ภาษากรีซ",
	Beta:"อักษรเบตาตัวใหญ่ภาษากรีซ",
	Gamma:"อักษรแกมม่าตัวใหญ่ภาษากรีซ",
	Delta:"อักษรเดลตาตัวใหญ่ภาษากรีซ",
	Epsilon:"อักษรเอปซีลอนตัวใหญ่ภาษากรีซ",
	Zeta:"อักษรซีตาตัวใหญ่ภาษากรีซ",
	Eta:"อักษรอีตาตัวใหญ่ภาษากรีซ",
	Theta:"อักษรทีตาตัวใหญ่ภาษากรีซ",
	Iota:"อักษรไอโอตาตัวใหญ่ภาษากรีซ",
	Kappa:"อักษรแคปปาตัวใหญ่ภาษากรีซ",
	Lambda:"อักษรแลมดาตัวใหญ่ภาษากรีซ",
	Mu:"อักษร mu ตัวใหญ่ภาษากรีซ",
	Nu:"อักษร nu ตัวใหญ่ภาษากรีซ",
	Xi:"อักษร xi ตัวใหญ่ภาษากรีซ",
	Omicron:"อักษรโอไมครอนตัวใหญ่ภาษากรีซ",
	Pi:"อักษร pi ตัวใหญ่ภาษากรีซ",
	Rho:"อักษร rho ตัวใหญ่ภาษากรีซ",
	Sigma:"อักษรซิกมาตัวใหญ่ภาษากรีซ",
	Tau:"อักษร tau ตัวใหญ่ภาษากรีซ",
	Upsilon:"อักษรอิปไซลอนตัวใหญ่ภาษากรีซ",
	Phi:"อักษร phi ตัวใหญ่ภาษากรีซ",
	Chi:"อักษร chi ตัวใหญ่ภาษากรีซ",
	Psi:"อักษร psi ตัวใหญ่ภาษากรีซ",
	Omega:"อักษรโอเมกาตัวใหญ่ภาษากรีซ",
	alpha:"อักษรอัลฟาตัวเล็กภาษากรีซ",
	beta:"อักษรเบตาตัวเล็กภาษากรีซ",
	gamma:"อักษรแกมม่าตัวเล็กภาษากรีซ",
	delta:"อักษรเดลตาตัวเล็กภาษากรีซ",
	epsilon:"อักษรเอปซิลอนตัวเล็กภาษากรีซ",
	zeta:"อักษรซีตาตัวเล็กภาษากรีซ",
	eta:"อักษรอีตาตัวเล็กภาษากรีซ",
	theta:"อักษรทีตาตัวเล็กภาษากรีซ",
	iota:"อักษรไอโอตาตัวเล็กภาษากรีซ",
	kappa:"อักษรแคปปาตัวเล็กภาษากรีซ",
	lambda:"อักษรแลมดาตัวเล็กภาษากรีซ",
	mu:"อักษร mu ตัวเล็กภาษากรีซ",
	nu:"อักษร nu ตัวเล็กภาษากรีซ",
	xi:"อักษร xi ตัวเล็กภาษากรีซ",
	omicron:"อักษรโอไมครอนตัวเล็กภาษากรีซ",
	pi:"อักษร pi ตัวเล็กภาษากรีซ",
	rho:"อักษร rho ตัวเล็กภาษากรีซ",
	sigmaf:"อักษรซิกมาสุดท้ายตัวเล็กภาษากรีซ",
	sigma:"อักษรซิกมาตัวเล็กภาษากรีซ",
	tau:"อักษร tau ตัวเล็กภาษากรีซ",
	upsilon:"อักษรอิปไซลอนตัวเล็กภาษากรีซ",
	phi:"อักษร phi ตัวเล็กภาษากรีซ",
	chi:"อักษร chi ตัวเล็กภาษากรีซ",
	psi:"อักษร psi ตัวเล็กภาษากรีซ",
	omega:"อักษรโอเมกาตัวเล็กภาษากรีซ",
	thetasym:"อักษรสัญลักษณ์ทีตาตัวเล็กภาษากรีซ",
	upsih:"อักษรอิปไซลอนภาษากริซที่มีสัญลักษณ์ห่วง",
	piv:"สัญลักษณ์ pi ภาษากรีซ",
	bull:"จุดนำ\nวงกลมสีดำเล็กๆ",
	hellip:"  จุดแนวนอน\nจุดนำสามจุด  ",
	prime:"สูง\nนาที\nฟุต",
	Prime:"สูงคู่\nวินาที\nนิ้ว",
	oline:"ข้ามเส้น\nคะแนนเกินช่องว่าง",
	frasl:"สแลชเศษส่วน",
	weierp:"สคริปต์ P ตัวใหญ่power set\nWeierstrass p",
	image:"ตัวอักษร I สีดำตัวใหญ่\nส่วนสมมุติ",
	real:"ตัวอักษร R สีดำตัวใหญ่\nสัญลักษณ์ส่วนที่แท้จริง",
	trade:"สัญลักษณ์เครื่องหมายการค้า",
	alefsym:"สัญลักษณ์ alef\nเลขสำหรับจำนวนนับแรก",
	larr:"ลูกศรชี้ไปทางซ้าย",
	uarr:"ลูกศรชี้ขึ้นบน",
	rarr:"ลูกศรชี้ไปทางขวา",
	darr:"ลูกศรชี้ลง",
	harr:"ลูกศรซ้ายขวา",
	crarr:"ลูกศรชี้ลงที่มีมุมไปทางซ้าย\nปัดแคร่",
	lArr:"ลูกศรสองตัวชี้ไปทางซ้าย",
	uArr:"ลูกศรสองตัวที่ชี้ไปข้างบน",
	rArr:"ลูกศรสองตัวชี้ไปทางขวา",
	dArr:"ลูกศรสองตัวที่ชี้ไปด้านล่าง",
	hArr:"ลูกศรสองตัวที่ชี้ไปซ้ายขวา",
	forall:"สำหรับทั้งหมด",
	part:"แตกต่างบางส่วน",
	exist:"ที่มีอยู่",
	empty:"ชุดว่าง\nชุด null\nเส้นผ่าศูนย์กลาง",
	nabla:"nabla\nความแตกต่างย้อนหลัง",
	isin:"อิลิเมนต์ของ",
	notin:"ไม่ใช่อิลิเมนต์ของ",
	ni:"รวมเป็นสมาชิก",
	prod:"ผลิตภัณฑ์ n-ary\nสัญลักษณ์ผลิตภัณฑ์",
	sum:"ผลรวม n-ary",
	minus:"เครื่องหมายลบ",
	lowast:"โอเปอเรเตอร์เครื่องหมายดอกจัน",
	radic:"รากที่สอง\nเครื่องหมายกรณฑ์",
	prop:"เป็นสัดส่วนกับ",
	infin:"อนันต์",
	ang:"มุม",
	and:"ตรรกะ และ\nวิธีการ",
	or:"ตรรกะ\nวี",
	cap:"สี่แยก\nแค็ป",
	cup:"สหภาพ\nคัพ","int":"อินทีกรัล",
	there4:"ดังนั้น",
	sim:"ตัวดำเนินการ tilde\nแปรเปลี่ยนกับ\nเหมือนกับ",
	cong:"ประมาณเท่ากับ",
	asymp:"เกือบเท่ากับ\nเกี่ยวกับ",
	ne:"ไม่เท่ากับ",
	equiv:"เหมือนกับ",
	le:"น้อยกว่าหรือเท่ากับ",
	ge:"มากกว่าหรือเท่ากับ",
	sub:"เซ็ตย่อยของ",
	sup:"ซุปเปอร์เซ็ตของ",
	nsub:"ไม่ใช่เซ็ตย่อยของ",
	sube:"เซ็ตย่อยของหรือเท่ากับ",
	supe:"ซุปเปอร์เซ็ตของหรือเท่ากับ",
	oplus:"บวกวงกลม\nผลรวมโดยตรง",
	otimes:"เวลาวงกลม\nผลิตภัณฑ์เวคเตอร์",
	perp:"ตั้งตรง\nไปทางเหนือ\nตั้งฉาก",
	sdot:"ตัวดำเนินการจุด",
	lceil:"เพดานซ้าย\nAPL upstile",
	rceil:"เพดานด้านขวา",
	lfloor:"พื้นด้านซ้าย\nดาวน์ไซต์ APL",
	rfloor:"พื้นด้านขวา",
	lang:"วงเล็บซ้าย",
	rang:"วงเล็บขวา",
	loz:"รูปเพชร",
	spades:"โพดำ",
	clubs:"สูทคลับสีดำ\nshamrock",
	hearts:"สูทหัวใจดำ\nวาเลนไทน์",
	diams:"ข้าวหลามตัด",
	OElig:"อักษรละติน OE ตัวใหญ่",
	oelig:"อักษร oe ตัวเล็กติดกันภาษาละติน",
	Scaron:"อักษรละติน S ตัวใหญ่ที่มีเครื่องหมายคารอน",
	scaron:"อักษรละติน s ตัวเล็กที่มีเครื่องหมายคารอน",
	Yuml:"อักษรละติน Y ตัวใหญ่ที่มีเครื่องหมายไดเอเรซิส",
	circ:"ตัวแก้ไขตัวอักษรเซอร์คัมเฟลกซ์",
	tilde:"ทิลเดอตัวเล็ก",
	ensp:"ช่องว่าง en",
	emsp:"ช่องว่าง em",
	thinsp:"ช่องว่างแบบบาง",
	zwnj:"ไม่ใช่ตัวรวมที่ความกว้างเป็นศูนย์",
	zwj:"ตัวรวมที่ความกว้างเป็นศูนย์",
	lrm:"มาร์กซ้ายไปขวา",
	rlm:"มาร์กขวาไปซ้าย",
	ndash:"แดช en",
	mdash:"แดช em",
	lsquo:"เครื่องหมายคำพูดเดี่ยวด้านซ้าย",
	rsquo:"เครื่องหมายคำพูดเดี่ยวด้านขวา",
	sbquo:"เครื่องหมายคำพูด low-9 เดี่ยว",
	ldquo:"เครื่องหมายคำพูดคู่ด้านซ้าย",
	rdquo:"เครื่องหมายคำพูดคู่ด้านขวา",
	bdquo:"เครื่องหมายคำพูด low-9 คู่",
	dagger:"แด็กเกอร์",
	Dagger:"แด็กเกอร์คู่",
	permil:"เครื่องหมาย per mille",
	lsaquo:"เครื่องหมายคำพูดเดี่ยวที่ชี้ไปด้านซ้าย",
	rsaquo:"เครื่องหมายคำพูดเดี่ยวที่ชี้ไปด้านขวา",
	euro:"เครื่องหมายยูโร"
})
);
