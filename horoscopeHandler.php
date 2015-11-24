<?php
	header( "Content-Type: text/html; charset=utf-8" );

	$first = $_POST['firstNum'];
	
	$second = $_POST['secondNum'];

	$username = $_POST['userName'];

	mysql_connect("localhost:3306 ", "mfazjiyl", "Eoq95y1Py8") or die (mysql_error ());

	mysql_select_db("mfazjiyl_karr") or die(mysql_error());
	
	mysql_query("SET NAMES utf8");

	$strSQL = "SELECT `$first` FROM `horoscope_first` UNION SELECT `$second` FROM `horoscope_second`";

	$rs = mysql_query($strSQL);
	
	print "<div class='horoscopeText'>";
	
	print "<div>";
	
	print "<p>Уважаем/ый/ая " . $username . "</p>";
	
	print "<p>Благодарим Вас за обращение в наш онлайн-сервис Восточного гороскопа!</p>";

	print "<p>Согласно Ваших данных мы получили расширенный, обобщающий результат. Более индивидуальная информация рассчитывается в платных вариантах Восточного гороскопа.</p>";
	
	print "</div>";

	while($row = mysql_fetch_array($rs))
	{
		
		print "<div>" . $row['0'] . "</div>";
	}
		
	mysql_close();
	
	print "<p style='border-top:1px dotted grey'>" . "Ваш бесплатный личный Восточный гороскоп Вам необходимо сразу сохранить или распечатать через команды ниже, т.к. он не сохранится на сервисе." . "</p>";
	
	print "<p>" . "Также приглашаем Вас получить больше важной и ценной информации в Индивидуальном платном Восточном гороскопе по доступной цене." . "</p>";

	print "<p>" . "Узнайте условия прямо здесь!" . "<button class='btn btn-default' type='submit'>" . "Узнать". "</button></p>";

	print "<p>" . "О новостях и акциях нашего сервиса Вы будете проинформированы по почте." . "</p>";

	print "<p>" . "Большое Вам спасибо за внимание к нам! Счастья Вам и благополучия!" . "</p>";

	print "<p>" . "Команда МойЗнак " . "<a href='#'>" . "a link" . "</a></p>";
	
	print "</div>";
	
?>