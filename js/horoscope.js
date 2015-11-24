var User = function(name, gender, birthDate, email){

    this.name = name;

    this.gender = gender;

    this.birthDate = birthDate;

    this.email = email;

};

var user,
    answer = {};

var helper = {

    userDate: '',

    tableWithSecondAnswer: '',

    isDateInRange: function(){

        //if range 1 jan - 3 feb

        this.getDate();

        var tmpYear = this.userDate.getFullYear();

        var tmpFirstRange = tmpYear + "-01-01";

        var tmpSecondRange = tmpYear + "-02-03";

        var firstDate = new Date( tmpFirstRange );

        var secondDate = new Date( tmpSecondRange );

        return ( this.userDate >= firstDate && this.userDate <= secondDate );

    },

    calculate: function( gndr ){

        var tmpYear,
            sum,
            tempFirstNum;

        if( this.isDateInRange() ){

            tmpYear = this.userDate.getYear() - 1;

        } else {

            tmpYear = this.userDate.getYear();

        }

        sum = this.getSumOfDoubleDigitNum( tmpYear );

        if( this.userDate.getFullYear() < 2000 ){

            ( gndr == 'male' ) ? ( tempFirstNum = 10 - sum ) : ( tempFirstNum = this.getSumOfDoubleDigitNum( 5 + sum ) );

            if ( tempFirstNum == 5 ){

                ( gndr == 'male' ) ? ( answer.firstNum = 2 ) : ( answer.firstNum = 8 );

            } else {

                answer.firstNum = tempFirstNum;

            }

        } else {

            ( gndr == 'male' ) ? ( tempFirstNum = 9 - sum ) : ( tempFirstNum = this.getSumOfDoubleDigitNum( 6 + sum ) );

            if ( tempFirstNum == 5 ){

                ( gndr == 'male' ) ? ( answer.firstNum = 2 ) : ( answer.firstNum = 8 );

            } else {

                answer.firstNum = tempFirstNum;

            }
        }
    },

    getGender: function(){

        var gndr = '',
            maleRadio = jQuery("input#optionsRadios1"),
            femaleRadio = jQuery("input#optionsRadios2");

        if( maleRadio.is( ':checked' ) ){

            gndr = maleRadio.val();

        } else if ( femaleRadio.is( ':checked' ) ){

            gndr = femaleRadio.val();

        } else {
		return false;
	}

        return gndr;
    },

    getSumOfDoubleDigitNum: function( doubleDigitNum ){

        var num = doubleDigitNum.toString();

        for( var i = 0; num.length > 1; i++ ){

            num = parseInt( num.charAt( num.length - 2 ) ) + parseInt( num.charAt( num.length - 1 ) ) + "";

        }

        return parseInt( num );
    },

    getDate: function(){

       this.userDate = new Date( user.birthDate );

    },

    makeArrayForSecondNum: function(){

        var arr = [];

        for( var i = 0, year = 1912; i < 12; i++, year++ ){

            var newArr = [];

            for( var j = 0, y = year; j < 10; j++, y = y + 12 ){

                newArr.push( y );

            }

            arr.push( newArr );

        }

        this.tableWithSecondAnswer = arr;
    },

    getFirstNum: function(){

        this.makeArrayForSecondNum();

        if( user.gender == 'male' ){

            this.calculate( user.gender );

        } else {

            this.calculate( user.gender );

        }
    },

    getSecondNum: function(){

        var tmpYear;

        if( this.isDateInRange() ){

            tmpYear = this.userDate.getFullYear() - 1;

        } else {

            tmpYear = this.userDate.getFullYear();

        }

        for( var i = 0; i < this.tableWithSecondAnswer.length; i++ ){

            for( var j = 0; j < this.tableWithSecondAnswer[i].length; j++ ){

                if( this.tableWithSecondAnswer[i][j] == tmpYear ){

                    answer.secondNum = i + 1;

                    break;

                }

            }

        }

    }

};

jQuery( ".js-submit" ).on( 'click', function( e ){

    e.preventDefault();

    user = new User( jQuery( 'input#fullName' ).val(), helper.getGender(), jQuery( 'input#birthDate' ).val() , jQuery( 'input#email' ).val() );

    if( user.birthDate && user.gender ){

        var dateForCheck = new Date( user.birthDate );


        if( dateForCheck.getFullYear() >= 1912 ){

            helper.getFirstNum();

            helper.getSecondNum();
		
	
	alert('First number: ' + answer.firstNum + '\nSecond number: ' + answer.secondNum + '\nGender: ' + user.gender);
	
	jQuery.ajax({
	type: "POST",	
	data: { 'firstNum': answer.firstNum, 'secondNum': answer.secondNum, 'userName': user.name },
        url: '/wp-includes/dbHorosckope/horoscopeHandler.php'
	}).done(function(data){
		jQuery('.formWrapper form').css('display', 'none');
		
		jQuery('.formWrapper').prepend(data);

		jQuery('div.social').css('display', 'inline-block');

	});

	
        
	} else {

            alert( 'Your date of birth can calculate only in paid-horoscope.' );

        }

    } else {

        alert( 'We need your date of birth and gender for horoscope! Please enter it.' );

    }

});