
const recognition = new webkitSpeechRecognition() || new SpeechRecognition(); 
recognition.lang = "he-IL";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = false;

function micClick() {
   startStop=0;	
const mictext=document.getElementById('resultMic').textContent;
  if(mictext.includes("עצור") ){
	startStop=1;  recognition.stop();
  }
else{
console.log("האזנה התחילה");
  document.getElementById('resultMic').textContent = " מאזין קבוע - לעצירה אמור עצור או לחץ שוב";
  recognition.start();}
}
recognition.onstart = function () {
  setTimeout(() => {
    recognition.stop();
  }, 17000); // עוצר אחרי 17 שניות
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  console.log("קלט מהמשתמש:", transcript);
  handleSearchFromVoice(transcript);
};

recognition.onend = () => {
console.log("האזנה הסתיימה – מתחיל מחדש");
if(startStop===0) {recognition.start();}
else{document.getElementById('resultMic').textContent ="לא מאזין"}
};

recognition.onerror = (e) => {
  console.error("שגיאת זיהוי קולי:", e.error);
  document.getElementById("result").textContent = "שגיאה בזיהוי קולי: " + e.error;
};

function hideformic() {
  hideAllimages();
  hideTkufa();
}

function handleSearchFromVoice(transcript) {
var ifrmValue;
const iframe = document.getElementById('ifrm');
const filter = document.getElementById('filter');

if(iframe){
	var iframeHref = iframe.contentWindow.location.href;
	var iframeCont=iframe.contentWindow;
	console.log(iframeCont);
	if(iframeHref==='about:blank'){ifrmValue=0}
	else{ifrmValue=1;}	
}

if(iframe!==null){
	if(iframe.src.includes('loan') || iframe.src.includes('ribit') || 
	iframe.src.includes('hashMenahalot')){ifrmValue=1;}
}
else{
	ifrmValue=0;
}
if(!transcript){return};
	if ((transcript.includes("קשר") || transcript.includes("סוכן"))) {yossi();
	}
	else if (Swal.isVisible()) {
		if (transcript.includes("מאשר") && !transcript.includes("לא") ) {
			const checkbox = document.getElementById("swal-checkbox");
			if (checkbox && !checkbox.checked) {
				checkbox.checked = true;
			}

			const confirmBtn = document.querySelector(".swal2-confirm");
			if (confirmBtn) {
				confirmBtn.click();
			}
		} else if (transcript.includes("לא מאשר") || transcript.includes("לא")) {
			const cancelBtn = document.querySelector(".swal2-cancel");
			if (cancelBtn) {
				cancelBtn.click();
			}
		}
	}

 	else if (transcript.includes("ראש")  && ifrmValue===1) {iframeCont.scrollTo(0, 0);
	}
	else if (transcript.includes("ראש")  && ifrmValue===0) {window.scrollTo(0, 0);
	}
	
  else if ((transcript.includes("הלוואות") || transcript.includes("הלוואה") || transcript.includes("שפיצר")) && ifrmValue === 0) {
    hideformic();
    showIframe("loan.html");

    const iframe = document.getElementById("ifrm");
    iframe.onload = function() {
        handleLoan(transcript);
    };
}
  else if ((transcript.includes("דריבית") || transcript.includes("ערך עתידי"))
  && ifrmValue === 0) {
	
    hideformic(); showIframe("ribitderibit.html");
	const iframe = document.getElementById("ifrm");
    iframe.onload = function() {
        handleCompoundInterest(transcript);
    };
  }
  else if ((transcript.includes("דמי ניהול") || transcript.includes("ניהול")) && ifrmValue===0) {
    hideformic(); showIframe("hashDmeyNihul.html");
  }
  
  else if ((transcript.includes("תשואה") || transcript.includes("תשואות")) && ifrmValue===1) {
	const pianoach=handleInput(transcript);
  }
  else if ((transcript.includes("הפקדה חודשית") || transcript.includes("יעד") 
  || transcript.includes("סכום יעד")) && ifrmValue===0) {
    hideformic(); showIframe("hafkada.html");
  }
  else if (transcript.includes("מחשבונים") || transcript.includes("פיננסיים")) {
    hideformic(); showIframe("Machshevonim.html");
  }
  else if ((transcript.includes("השוואה") || transcript.includes("השוואת")
	)
  && ifrmValue===0) {
    if (transcript.includes("מנהלות") || transcript.includes("מנהלת")) {
      hideformic(); showIframe("hashMenahalot.html");
	  const iframe = document.getElementById("ifrm");
    	iframe.onload = function() {
        handleMenahalot(transcript);
    };

    }
    else if (transcript.includes("חשיפות")) {
      hideformic(); showIframe("hasifotMeshulav.html");
    }
    else if (transcript.includes("שארפ") || transcript.includes("שרפ")) {
      hideIframe(); toggleMenu(); hideAllimages(); createForm(0);handleSharp(transcript)
    }
    else if (transcript.includes("משולב") || transcript.includes("תיק")) {
      hideformic(); showIframe("VirtualInvest.html");
    }
    else {
      hideformic(); showIframe("hashvaotRikuz.html");
    }
  }
  else if(transcript.includes("מנהלות") || transcript.includes("מנהלת")) {
      hideformic(); showIframe("hashMenahalot.html");
    }
    else if(transcript.includes("חשיפות")) {
      hideformic(); showIframe("hasifotMeshulav.html");
    }
    else if(transcript.includes("שארפ") || transcript.includes("שרפ")) {
		hideformic(); toggleMenu();  createForm(0);handleSharp(transcript);
    }
    else if(transcript.includes("משולב") || transcript.includes("תיק")) {
      hideformic(); showIframe("VirtualInvest.html");
    }
  else if(transcript.includes("מקצועי") || transcript.includes("מידע")) {
    if (transcript.includes("קרנות השתלמות")) {
      hideformic(); showIframe("hishtalmotMikzoei.html");
    }
    else if (transcript.includes("קרנות פנסיה")) {
      hideformic(); showIframe("pensiaMikzoei.html");
    }
    else if (transcript.includes("השקעה")) {
      hideformic(); showIframe("hashkaaMikzoei.html");
    }
    else if (transcript.includes("ילד")) {
      hideformic(); showIframe("hisyeled.html");
    }
    else if (transcript.includes("פוליסות")) {
      hideformic(); showIframe("polisotMikzoei.html");
    }
    else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
      hideformic(); showIframe("kupatgemelmikzoei.html");
    }
    else {
      hideformic(); showIframe("meidaMikzoei.html");
    }
  }
  else if (transcript.includes("קרנות השתלמות") && !transcript.includes("מקצועי")
	  && filter.style.display==='none') {
    showKupaMeida('pHish'); hideMaBaatar(); maslulim(30,'קרנות השתלמות',0);
  }
  else if (transcript.includes("קרנות פנסיה") && !transcript.includes("מקצועי")  && filter.style.display==='none' ) {
    showKupaMeida('pPensia'); hideMaBaatar(); maslulimP(30,'קרנות חדשות',0);
  }
  else if (transcript.includes("השקעה") && !transcript.includes("מקצועי")
	  && filter.style.display==='none') {
    showKupaMeida('pHash'); hideMaBaatar(); maslulim(30,'קופת גמל להשקעה',0);
  }
  else if (transcript.includes("ילד") && !transcript.includes("מקצועי")) {
    showKupaMeida('pYeled'); hideMaBaatar(); maslulim(30,'קופת גמל להשקעה - חסכון לילד',0);
  }
  else if (transcript.includes("פוליסות") && !transcript.includes("מקצועי")) {
    showKupaMeida('pPolisa'); hideMaBaatar(); maslulim(30,'פוליסות חסכון',0);
  }
  else if (transcript.includes("גמל") && !transcript.includes("השקעה") && !transcript.includes("מקצועי")
	   && filter.style.display==='none' ) {
    showKupaMeida('pGemel'); hideMaBaatar(); maslulim(30,'תגמולים ואישית לפיצויים',0);
  }
  else if (((transcript.includes("דף") || transcript.includes("חזור") || transcript.includes("הבית"))) 
&& !transcript.includes("ראש")) {
    hideframe(); showAllimages(); 
  }
  else if (transcript.includes("שימוש") || transcript.includes("תנאי")) {
    showIframe('tnaiyShimosh.html');
  }
  else if (transcript.includes("סיכון") || transcript.includes("סיכון")) {
    showIframe('riskQuest.html');
  }
  else if (transcript.includes("עצור") || transcript.includes("הפסק") || transcript.includes("צליל")) {
	startStop=1;
	  
    }
	else if (transcript.includes("הסבר") || transcript.includes("הוראות קוליות") || transcript.includes("הוראות")) {
		showIframe('koliHes.html');
	  
    }
	else if (transcript.includes("תקרות") || transcript.includes("תקרות הפקדה")) {
		showIframe('tikrot.html');
	  
    }
	else if (transcript.includes("מסלול") ) {
		const match = transcript.match(/מסלול\s+(\S+)/);
			if (match) {
				searchMh(match[1]); 
		}

		else{alert("אמור מסלול + מספר מסלול")}	  
    }

	


	else if ((transcript.includes("גלול למטה") || transcript.includes('למטה')) &&
	ifrmValue===1) {
		if(transcript.includes("הרבה")){
			var tvach=700;
			var minustvach=-700;
		}
		else if(transcript.includes("קצת")){
			var tvach=150;
			var minustvach=-150;
		}	
		else{
			var tvach=300
			var minustvach=-300
		}
    
    	if (iframeCont.scrollY + tvach > iframeCont.document.body.scrollHeight - iframeCont.innerHeight) {
       	 iframeCont.scrollTo(0, iframeCont.document.body.scrollHeight - iframeCont.innerHeight);
    	} else {
        	iframeCont.scrollBy(0, tvach);
    	}
	}

	else if ((transcript.includes("גלול למעלה") || transcript.includes('למעלה')) &&
	ifrmValue===1) {
		if(transcript.includes("הרבה")){
			var tvach=700;
			var minustvach=-700;
		}
		else if(transcript.includes("קצת")){
			var tvach=150;
			var minustvach=-150;
		}
		else{
			var tvach=300
			var minustvach=-300
		}
		if (iframeCont.scrollY - tvach < 0) {
			iframeCont.scrollTo(0, 0);
		} else {
			iframeCont.scrollBy(0, minustvach);
		}
	}

	else if (transcript.includes("גלול למטה") || transcript.includes('למטה')) {
		if(transcript.includes("הרבה")){
			var tvach=700;
			var minustvach=-700;
		}
		else if(transcript.includes("קצת")){
			var tvach=150;
			var minustvach=-150;
		}
		else{
			var tvach=300
			var minustvach=-300
		}
	if(window.scrollY+tvach>document.scrollHeight-window.innerHeight){
		window.scrollBy(0,document.scrollHeight-window.innerHeight)
	}	
	else{window.scrollBy(0,tvach)}
	  
    }
	else if (transcript.includes("גלול למעלה") || transcript.includes('למעלה')) {
		if(transcript.includes("הרבה")){
			var tvach=700;
			var minustvach=-700;
		}
		else if(transcript.includes("קצת")){
			var tvach=150;
			var minustvach=-150;
		}
		else{
			var tvach=300
			var minustvach=-300
		}
		if(window.scrollY-tvach<0){
		window.scrollTo(0,0)
	}	
	else{window.scrollBy(0,minustvach)}
	  
    }
	else if(document.getElementById('ifrm')){
		if(document.getElementById('ifrm').src.includes("loan")){
		handleLoan(transcript);return
		}
		else if(document.getElementById('ifrm').src.includes("ribitderibit")){
			handleCompoundInterest(transcript);return;	
		}
		else if(document.getElementById('ifrm').src.includes("hashMenahalot")){
			handleMenahalot(transcript);return;	
		}
        else if(!filter.style.display==='none'){
			handleSharp(transcript);return;	
		}	
		
	}	
  	else {
    	alert("הבקשה אינה ברורה - לחץ שוב");
 	 }
	
}
		
function handleLoan(transcript) {

	console.log("🔍 טקסט שזוהה:", transcript);

	
	const iframex = document.getElementById('ifrm');
	const loanDoc = iframex.contentWindow.document;
	const loanWindow = iframex.contentWindow;
	const loanAmountInput = loanDoc.getElementById('loan-amount');
	const termfor = loanDoc.getElementById('loan-term');
	const interestfor = loanDoc.getElementById('interest-rate');
	const delayfor = loanDoc.getElementById('payment-delay');

	const pianoach=handleInput(transcript);
	console.log(pianoach);


	// סכום
	if (pianoach.amount) {  
		loanAmountInput.value = pianoach.amount;
		console.log("📌 סכום זוהה:", pianoach.amount);
	}

	// גרייס
	if (pianoach.grace) {		
			delayfor.value = pianoach.grace;
			console.log("📌 גרייס זוהה:", pianoach.grace, "חודשים");	
	}
	else if (transcript.includes("גרייס") ) {		
		delayfor.value = '';
		console.log("📌 גרייס זוהה:", "ללא גרייס");
	}
	// תקופה (ללא גרייס)
	if (pianoach.term) {		
			termfor.value = pianoach.term;
			console.log("📌 תקופה זוהתה:", pianoach.term, "חודשים");		
	}

	// ריבית
	if (pianoach.interest) {		
			interestfor.value = pianoach.interest;
			console.log("📌 ריבית זוהתה:", pianoach.interest + "%");	
	}

	// הפעלת מחשבון רק אם כל השדות מולאו
	if (termfor.value && interestfor.value && loanAmountInput.value) {
		loanWindow.calculateLoan();
	}

	// לוח סילוקין
	if (transcript.includes("סילוקין") || transcript.includes("לוח") || transcript.includes("הסתר")) {
		loanWindow.toggleAmortizationTable();
	}
}

    /*
    if (amount && term && interest) {
        console.log("✅ כל הנתונים זוהו. מבצע עדכון");
		console.log(amount, term, interest);
        updateLoanSimulator(amount, term, interest);
    } else {
        
        if (!amount) alert("אנא אמור לי את סכום ההלוואה");
       else if (!term) alert("אנא אמור לי את תקופת ההלוואה");
        else if (!interest) alert("אנא אמור לי את הריבית");
    }
}*/
function handleCompoundInterest(transcript) {
  console.log("🔍 טקסט שזוהה:", transcript);

  const iframex = document.getElementById('ifrm');
  const compoundDoc = iframex.contentWindow.document;
  const compoundWindow = iframex.contentWindow;
  const initialAmountInput = compoundDoc.getElementById('hadpeami');
  const monthlyDepositInput = compoundDoc.getElementById('hodshi');
  const termInput = compoundDoc.getElementById('txttkofa1');
  const interestRateInput = compoundDoc.getElementById('selecttoz');
  const DmeyNihulInput= compoundDoc.getElementById('txttkofa2');
  const tesuaInput= compoundDoc.getElementById('selectoz');

  const pianoach=handleInput(transcript);
  console.log(pianoach.tesua);

  	// סכום
	if (pianoach.had) {  
		initialAmountInput.value = pianoach.had;
		console.log("📌 סכום חד פעמי:", pianoach.had);
	}
	if (pianoach.hodshi) {  
		monthlyDepositInput.value = pianoach.hodshi;
		console.log("📌 סכום חודשי:", pianoach.hodshi);
	}

	if (pianoach.term) {	
			termInput.value = pianoach.term;
			console.log("📌 תקופה זוהתה:", pianoach.term, "שנים");
	}

	// ריבית
	if (pianoach.interest) {		
		interestRateInput.value = pianoach.interest/100;
		compoundDoc.getElementById("kottoz").textContent = `לפי ריבית ${pianoach.interest}% שנתי:`;
			console.log("📌 ריבית זוהתה:", interestRateInput.value + "%");	
	}

  if (pianoach.dmey) {
    
    DmeyNihulInput.value = pianoach.dmey;
    console.log("📌 דמי ניהול שזוהו:", pianoach.dmey + "%");
  }
 

  // הפעלת חישוב אם כל השדות מולאו
  if (initialAmountInput.value && monthlyDepositInput.value && termInput.value) {
    if (interestRateInput.value) {
      compoundWindow.hashev(interestRateInput.value);
      console.log("✅ הופעל בריבית:", interestRateInput.value / 100);
    } else {
      compoundWindow.hashev(0.04);
      console.log("✅ הופעל hashev(0.04) כברירת מחדל");
    }
	
  }
}
function handleMenahalot(transcript) {

  const iframex = document.getElementById('ifrm');
  const menahalotDoc = iframex.contentWindow.document;
  const menahalotWindow = iframex.contentWindow;
  const rd1=menahalotDoc.getElementById('radio1');
  const rd2=menahalotDoc.getElementById('radio2'); 
  const selmenu1 = menahalotDoc.getElementById('selmen1');
  const selmenu2 = menahalotDoc.getElementById('selmen2'); 
	var input='';
  if (transcript.includes("שתי") || rd2.checked===true) {
	console.log("שתי חברות נבחרו");
	rd2.checked=true;
	menahalotDoc.getElementById('form2').style.display='flex';
	menahalotDoc.getElementById('form1').style.display='none';

	


	if (transcript.includes("מובילה") || transcript.includes("מול")) {
		if (transcript.includes("מובילה") && transcript.includes("מול")){
			const matchtext=transcript.split("מול");
			input=matchHevra(matchtext[0].trim());
			var match = gufmosdixA.find(name => name.includes(input));
			selmenu1.value = match;
			console.log("מובילה",match);
			input=matchHevra(matchtext[1].trim());
			var match = gufmosdixA.find(name => name.includes(input));
			selmenu2.value = match;
			console.log("מול",match);
			
		}
		
		else if(transcript.includes("מובילה")){
			input=matchHevra(transcript);
			var match = gufmosdixA.find(name => name.includes(input));
			selmenu1.value = match;
		}
		else if(transcript.includes("מול")){
			input=matchHevra(transcript);
			var match = gufmosdixA.find(name => name.includes(input));
			selmenu2.value = match;
		}
		
		
	}	
	
	if(transcript.includes("השווה") || transcript.includes("השוואה") || transcript.includes("בצע")
		||  transcript.includes("בצא")){
		const iframe = document.getElementById('ifrm');
		var iframeCont=iframe.contentWindow;
		menahalotWindow.compare2();
		iframeCont.scrollBy(0, window.innerHeight*0.8);
			
		}	
		if(transcript.includes("הדפס") || transcript.includes("pdf")){
		const iframe = document.getElementById('ifrm');
		var iframeCont=iframe.contentWindow;
		menahalotWindow.pdfDo();
			
		}	
		
}
	

	if (transcript.includes("מרובה")) {
		rd1.checked=true;
		menahalotWindow.selchange()}
	
	}
function handleSharp(transcript) {
        var sugmM=document.getElementById('sugM');        
        
          var input='';

        if (transcript.includes("השתלמות")) {
            sugmM.value='קרנות השתלמות';
        }
        else if (transcript.includes("פנסיה")) {
            sugmM.value='קרנות פנסיה - מקיפה';}
        else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
            sugmM.value='קופות גמל';}
        else if (transcript.includes("השקעה")) {
            sugmM.value='קופת גמל להשקעה';}
        else if (transcript.includes("חסכון") || transcript.includes("חיסכון")) {
            sugmM.value='פוליסות חסכון';}  
        
          if(transcript.includes("השווה") || transcript.includes("השוואה") || transcript.includes("בצע")
              ||  transcript.includes("בצא")){  
            tablhasifot()
            window.scrollBy(0, window.innerHeight*0.8);}
                  
      }
          
      

function matchHevra(transcript){
	if (transcript.includes("מגדל")) {return "מגדל";}
	else if (transcript.includes("הראל")) {return  "הראל";}
	else if (transcript.includes("כלל")) {return  "כלל";}
	else if (transcript.includes("מנורה")) {return  "מנורה";}
	else if (transcript.includes("אלטשולר")) {return "אלטשולר";}
	else if (transcript.includes("פניקס")) {return  "פניקס";}
	else if (transcript.includes("מור")) {return  "מור";}
	else if (transcript.includes("ילין")) {return  "ילין";}
	else if (transcript.includes("אנליסט")) {return  "אנליסט";}
	else if (transcript.includes("מיטב")) {return  "מיטב";}
	else if (transcript.includes("אינפי") || transcript.includes("אנפי")) {return "אינפיניטי";}
}
function extractAmounta(text) {
    const units = {
      "אפס": 0, "אפסים": 0,
      "אחד": 1, "אחת": 1,
      "שתיים": 2, "שניים": 2, "שתי": 2,
      "שלוש": 3, "שלושה": 3, "שלושת": 3,
      "ארבע": 4, "ארבעה": 4, "ארבעת": 4,
      "חמש": 5, "חמישה": 5, "חמשת": 5,
      "שש": 6, "שישה": 6, "ששת": 6,
      "שבע": 7, "שבעה": 7, "שבעת": 7,
      "שמונה": 8, "שמונת": 8,
      "תשע": 9, "תשעה": 9, "תשעת": 9,
      "עשר": 10, "עשרה": 10, "עשרת": 10,
      "אלפיים": 2000
    };
    const teens = {
      "אחת עשרה": 11, "אחד עשר": 11, "שתים עשרה": 12, "שניים עשר": 12,
      "שלוש עשרה": 13, "שלושה עשר": 13, "ארבע עשרה": 14, "ארבעה עשר": 14,
      "חמש עשרה": 15, "חמישה עשר": 15, "שש עשרה": 16, "שישה עשר": 16,
      "שבע עשרה": 17, "שבעה עשר": 17, "שמונה עשרה": 18, "שמונה עשר": 18,
      "תשע עשרה": 19, "תשעה עשר": 19
    };
    const tens = {
      "עשרים": 20, "שלושים": 30, "ארבעים": 40,
      "חמישים": 50, "שישים": 60, "שבעים": 70,
      "שמונים": 80, "תשעים": 90
    };
    const hundreds = {
      "מאה": 100, "מאתיים": 200, "שלוש מאות": 300, "ארבע מאות": 400,
      "חמש מאות": 500, "שש מאות": 600, "שבע מאות": 700,
      "שמונה מאות": 800, "תשע מאות": 900
    };
    const bigNumbers = { "אלף": 1000, "מיליון": 1000000, "אלפים": 1000 };
    const fractions = { "חצי": 0.5, "שליש": 1/3, "שלושת רבעי": 0.75, "רבע": 0.25 };
    const multipliers = { "כפול": true, "פי": true };

    let total = 0, currentGroup = 0, multiplyNext = 1;
    const cleanedText = text.replace(/[,\-]/g, ' ').replace(/\s+/g, ' ').replace(/(^ו)|(\sו)/g, ' ').trim();
    const words = cleanedText.split(' ');

    for (let i = 0; i < words.length; i++) {
      let word = words[i].trim();
      if (!word) continue;
      if (multipliers[word]) { multiplyNext = currentGroup || 1; currentGroup = 0; continue; }
      if (/^\d+$/.test(word)) { currentGroup += parseInt(word); continue; }
      if (i + 1 < words.length) {
        const twoWords = word + ' ' + words[i + 1];
        if (teens[twoWords]) { currentGroup += teens[twoWords]; i++; continue; }
        if (hundreds[twoWords]) { currentGroup += hundreds[twoWords]; i++; continue; }
      }
      if (units[word]) currentGroup += units[word];
      else if (tens[word]) currentGroup += tens[word];
      else if (hundreds[word]) currentGroup += hundreds[word];
      else if (bigNumbers[word]) {
        if (currentGroup === 0) currentGroup = 1;
        total += currentGroup * bigNumbers[word];
        currentGroup = 0;
      }
      else if (fractions[word]) {
        if (currentGroup === 0) currentGroup = 1;
        total += currentGroup * fractions[word];
        currentGroup = 0;
      }
    }
    total += currentGroup;
    total *= multiplyNext;
    return total || null;
  }

function extractInterestRatea(text) {
  text = text.replaceAll("אחוזים", "אחוז").replaceAll("%", "אחוז").trim();

const wordMap = {
  "אחת": 1, "אחד": 1, "שתיים": 2, "שניים": 2,
  "שלוש": 3, "שלושה": 3, "ארבע": 4, "ארבעה": 4,
  "חמש": 5, "חמישה": 5, "שש": 6, "שישה": 6,
  "שבע": 7, "שבעה": 7, "שמונה": 8,
  "תשע": 9, "תשעה": 9
};

function getDecimalWord(word) {
  return wordMap[word] ?? null;
}

// תבנית: "שלושה נקודה חמש"
const match = text.match(/(אחת|אחד|שתיים|שניים|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה)\s*נקודה\s*(אחת|אחד|שתיים|שניים|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה)/);
if (match) {
  const intPart = getDecimalWord(match[1]);
  const decimalPart = getDecimalWord(match[2]);
  if (intPart != null && decimalPart != null) {
    return parseFloat(`${intPart}.${decimalPart}`);
  }
}

// תבנית: מספר ספרתי רגיל
const digitMatch = text.match(/(\d+(?:\.\d+)?)\s*אחוז/);
if (digitMatch) return parseFloat(digitMatch[1]);

// תבנית: "שישה אחוז"
const wordOnlyMatch = text.match(/(אחת|אחד|שתיים|שניים|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה)\s*אחוז/);
if (wordOnlyMatch) {
  const val = getDecimalWord(wordOnlyMatch[1]);
  if (val != null) return val;
}

return null;
  }

function handleInput(text) {

// חילוץ ממוקד לפי הקשר ולא לפי סדר בטקסט
const hadMatch = text.match(/(?:סכום\s+)?חד\s*פעמי\s+(.*?)(?=(סכום|חודשי|ריבית|תקופה|גרייס|$))/);
const hodshiMatch = text.match(/(?:סכום\s+)?חודשי\s+(.*?)(?=(סכום|חד\s*פעמי|ריבית|תקופה|גרייס|$))/);
const amountMatch = text.match(/(?:סכום\s+)(?!חודשי)(?!חד\s*פעמי)(.*?)(?=(חד\s*פעמי|חודשי|ריבית|תקופה|גרייס|$))/);
const interestMatch = text.match(/(?:ריבית\s*(של)?\s*)(.*?)(?=(סכום|תקופה|גרייס|$))/);
const termMatch = text.match(/(?:תקופ[ה|ת]\s*(של)?\s*)(.*?)(?=(ריבית|סכום|גרייס|$))/);
const graceMatch = text.match(/(?:גרייס\s*(של)?\s*)(.*?)(?=(ריבית|תקופה|סכום|$))/);
const dmeyMatch = text.match(/(?:ניהול\s*(של)?\s*)(.*?)(?=(ריבית|תקופה|סכום|$))/);
//const tesuaMatch = text.match(/(?:תשוא[אה]?|תשועה)\s*(של)?\s*(.*?)(?=(ריבית|תקופה|סכום|$))/);

  // טקסטים
const hadText = hadMatch ? hadMatch[1] : '';
const hodshiText = hodshiMatch ? hodshiMatch[1] : '';
const amountText = amountMatch ? amountMatch[1] : '';
const interestText = interestMatch ? interestMatch[2] : '';
const dmeyText = dmeyMatch ? dmeyMatch[2] : '';
const termText = termMatch ? termMatch[2] : '';
const graceText = graceMatch ? graceMatch[2] : '';
//const tesuaText = tesuaMatch ? tesuaMatch[2] : '';

// המרות
const had = extractAmounta(hadText);
const hodshi = extractAmounta(hodshiText);
const amount = extractAmounta(amountText);
const interest = extractInterestRatea(interestText);
const term = extractAmounta(termText);
const grace = extractAmounta(graceText);
const dmey = extractInterestRatea(dmeyText);
// const tesua = extractInterestRatea(tesuaText)+"%";

  return {
  had: had,
  hodshi: hodshi,
  amount: amount,
  interest: interest,
  term: term,
  grace: grace,
  dmey: dmey,
  
      
};
}
