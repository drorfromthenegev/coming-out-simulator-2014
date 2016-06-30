
function Start(){

	$ = {};
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	//////////////////////////////

	N("<b>"+
    "סימולטור יציאה מהארון 2014"
    +"</b>");
	N("משחק חצי אמיתי על חצאי אמיתות.");
	N("היי את, שחקנית, באת בשביל המשחק, אני מניח.");
	N("מה תרצי לעשות עכשיו?");

	Choose({
		"בוא נתחיל לשחק עכשיו!": Play,
		"מי אתה? (קרדיטים)": function(){
			Credits("מי אתה?");
		},
		"המממ, ספר לי עוד. (אודות המשחק)": function(){
			About("המממ, ספר לי עוד.");
		}
	});

}

function SipCoffee(message){
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	PlaySound("sfx","coffee_sip");
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");
}

function Play(message){
	
	SipCoffee(message);

	// Asked neither
	if(!$.asked_about && !$.asked_credits){
		N("קופצת ישר לעניינים! מצוין!");
		N("לא מבזבזת זמן על הקרדיטים או על ה'אודות'...");
		p("שוש.");
		N("פסדר, פסדר.");
	}
	// Asked both
	if($.asked_about && $.asked_credits){
		p(". . .");
		p("למה שמת את זה כאפשרות לבחירה אם כבר בחרתי בכל יתר האפשרויות?");
		N("אין לי מושג");
	// Asked either
	}else if($.asked_about || $.asked_credits){
		N("קדימה, בואי נתחיל!");
	}

	N("בואי ונחזור ארבע שנים אחורה בזמן, ל-2010...");
	p("זה היה לפני ארבע שנים?!");
	N("...לערב ששינה את חיי לנצח.");
    N("כמו כן, נכון לעת תרגום המשחק עברו כבר 6 שנים מ-2010, אבל שזה יישאר בינינו.");
	N("אז ספרי לי, שחקנית יקרה, איך את חושבת שכל זה יגמר?");

	Choose({
		"עם פרחים, קשתות בענן וחדי קרן גייז?": function(message){
			$.main_menu_convo_1 = 1;

			p(message);
			N("כן, ככה בדיוק המשחק הזה נגמר.");
			p("באמת?");
			N("לא.");
			Play_2();
		},
		"בבית קפה כשאתה מעדכן סטטוסים בפייסבוק.": function(message){
			$.main_menu_convo_1 = 2;

			p(message);
            N("היי, אני מתכנת על הלפטופ הזה! הופך את סיפור ההתבגרות שלי למשחק בו אתה משחק עכשיו.");
			p("כן בטח. אתה סתם מבזבז זמן במקום לעבוד.");
			N("תראו מי שמדברת.");
			p("היי, אני משחקת בזה כחלק מפעילות חינוכית-ערכית חשובה!");
			N("נחמד! בכל מקרה...");
			Play_2();
		},
		"זה נגמר ב<b>דם</b>": function(message){
			$.main_menu_convo_1 = 3;

			p(message);
			N("אמממ... בהשוואה לזה הסיפור שלי לא כזה טראגי.");
			N("אבל קשה להגיד שהוא עליז במיוחד מצד שני.");
			N("בכל מקרה...");
			Play_2();
		}
	});

}

function Play_2(){

	if(!$.asked_about){
		N("אם לא היית מדלגת על ה'אודות', היית יודעת שזה משחק על סיפור ממש אישי.");
		p("שוש.");
	}

    N("יש במשחק הזה שיחות שאני, ההורים שלי, והחבר שלי לשעבר באמת אמרנו.");
	N("וגם כל הדברים שרצינו לומר, היינו צריכים לומר או שלא היינו צריכים לומר לעולם.");
	N("זה לא משנה מה זה מה.");
	N("לא עוד.");

	Choose({
		"איך אפשר לנצח במשחק בלי תשובות נכונות?": function(message){
			$.main_menu_convo_2 = 2;

			p(message);
			N("בדיוק.");
			p(". . .");
			Play_3();
		},
		"אתה טיפוס קצת מדכא, אתה יודע?": function(message){
			$.main_menu_convo_2 = 1;

			p(message);
			N("החיים זה דבר קצת מדכא.");
			p("מבחינתי זה 'כן'.");
			Play_3();
		},
		"אז המשחק ה'אמיתי' הזה מורכב למעשה משקרים?": function(message){
			$.main_menu_convo_2 = 3;

			p(message);
			N("גם אם השיחות היו מדויקות במאת האחוזים, הן היו 100% שקריות.");
			p(". . .");
			Play_3();
		}
	});

}

function Play_3(){

	N("את תשחקי את דמותי, באיזור שנת 2010.");
	if(!$.asked_credits){
		N("בגלל שדילגת על הקרדיטים, אגיד לך ששמי (העדיין-לא-רשמי) הוא ניקי קייס.");
		p("שוש.");
	}

	var whatISay;
	switch($.main_menu_convo_1){
		case 1: whatISay = "המשחק הזה לא נגמר בחדי-קרן גייז."; break;
		case 2: whatISay = "זה משחק על יציאה מהארון, על התבגרות ועל השלמה."; break;
		case 3: whatISay = "המשחק הזה לא נגמר בדם, אבל בדמעות."; break;
	}
    whatISay+=" "
	switch($.main_menu_convo_2){
		case 1: whatISay += "מצטער על זה שאני קצת מדכא."; break;
		case 2: whatISay += "ואין תשובות נכונות."; break;
		case 3: whatISay += "והוא מלא בשקרים."; break;
	}
	N(whatISay);

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("היי, רק אמרתי את זה!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	Wait(500);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");
	
	Wait(1000);
	Show("nicky","coffee_nicky_still_2");
	Wait(500);
	
	N("כשאת משחקת...");
	N("בחרי מילותייך בתבונה.");
	N("כל דמות תזכור כל דבר שתאמרי. או לא תאמרי.");
	p("כן, הבנתי. אפילו הבאת בפניי בחירות בתפריט הראשי.");
	N("בדיוק.");

	N(". . .");
	N("יש דברים שקשה לשכוח.");
	
	Clear();
	Start_Jack_1();

}

function Credits(message){

	$.asked_credits = true;
	
	if($.asked_about){
		SipCoffee(message);
	}else{
		SipCoffee("מי אתה?");
	}
	
	N("אויש, כמה לא מנומס מצידי! הרשי לי להציג את עצמי.");
	N("היי, אני ניקי קייס.");
	N("זה לא השם החוקי שלי, זה רק השם האמיתי שלי.");

	p("זה ממש מוזר, חבוב.");
	if($.asked_about){
		p("וכמו שסיפרת, זה משחק על הסיפור האישי שלך?");
	}else{
		p("ואתה הכנת את המשחק הזה?");
	}

	N("כן, אני המתכנת/כותב/אמן היחידי מאחורי המשחק הזה.");

	if($.asked_about){
		p("את כל זה עשית בעצמך?");
		p("אמרתי ואגיד זאת שוב...");
		p("כמובן, נרקיסיסט שכמותך.");
		N("ובכן, זה לא רק אני.");
		N("קטעי השמע נלקחו ממקורות שונים בנחלת הכלל.");
	}else{
		N("אבל קטעי השמע נלקחו ממקורות שונים בנחלת הכלל.");
	}
    N("והמתרגם של המשחק לעברית הוא דרור רפפורט. תודה דרור!");
    p("אתה בטוח שאתה אמרת את זה או שדרור הוסיף את זה בתרגום?");
    N("מה פתאום? כמובן שאני חושב שדרור כל כך מבריק ומהמם שמגיע לו אזכור בתוך המשחק!");
	N("בכל מקרה, למרות שזה בעיקר אני מאחורי המשחק...");
	N("...יש הרבה אנשים מאחורי המשחק הזה.");

	if($.asked_about){
		Choose({
			"אם כבר מדברים על זה, בוא נתחיל לשחק! עכשיו!": Play
		});
	}else{
		Choose({
			"אם כבר מדברים על זה, אפשר להתחיל לשחק כבר?": Play,
			"למה בנית את המשחק הזה? (אודות המשחק)": function(){
				About("למה בנית את המשחק הזה?");
			}
		});
	}

}

function About(message){

	$.asked_about = true;

	SipCoffee(message);

	if($.asked_credits){
		N("רציתי לספר את הסיפור שלי.");
	}else{
		N("המשחק הזה...");
		N("...הוא על סיפור מאוד אישי.");
	}
	
	p("כמובן, נרקיסיסט שכמותך.");
	N("כן, בטוח.");

	if($.asked_credits){
		p("למעשה לא, נרקסיסט אמיתי ישתמש בשם האמיתי שלו.");
		N("אמרתי לכה, זה "+"<b>"+"כן"+"</b>"+" "+"השם האמיתי שלי!");
		p("כן, כן, מוזר שכמותך.");
	}

	N("הכנתי את המשחק למרתון המשחקים #Nar8. הביאו לי תירוץ ודדליין!");
	p("בטח התמהמת עד היום האחרון.");
	N("כן!");
	N("כמו כן, שיחררתי את זכויות היוצרים על המשחק הזה. מוקדש לגמרי לנחלת הכלל!");
	N("אני פתוח לגבי קוד המקור שלי כמו שאני פתוח לגבי המיניות שלי.");

	p("זו הייתה בדיחה ממש גרועה.");
	N("בכל מקרה, בגלל שהמשחק שוחרר לנחלת הכלל התרגום הזה יכול היה להתקיים!");

	if($.asked_credits){
		Choose({
			"בוא כבר נתחיל לשחק.": Play
		});
	}else{
		Choose({
			"אז אפשר לשחק עכשיו?": Play,
			"אז מי אתה באמת (קרדיטים)": function(){
				Credits("אז מי אתה באמת?");
			}
		});
	}

}       
