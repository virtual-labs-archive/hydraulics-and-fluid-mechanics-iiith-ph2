<?php
$total=0;
$Q1 = $_POST['Q1'];
$Q2 = $_POST['Q2'];
$Q3 = $_POST['Q3'];
$Q4 = $_POST['Q4'];
$Q5 = $_POST['Q5'];
echo "You answered the following questions correctly : ";
if ($Q1==2)
{
$total=$total+1;
echo "1 ";
}
if ($Q2==1)
{
$total=$total+1;
echo "2 ";
}
if ($Q3==1)
{
$total=$total+1;
echo "3 ";
}
if ($Q4==1)
{
$total=$total+1;
echo "4 ";
}
if ($Q5==2)
{
$total=$total+1;
echo "5 ";
}
echo "\n\n\n\n";
echo "<html>
<head></head>";
echo "<body class=\"page_bg\">";
echo "<br>Total number of correct answers : ".$total."/8";
echo "	<h2>Correct Answers</h2>
<br>
<ol>
	        <li><b>Flow to be laminar the Reynolds number should be greater than 2000.</b></li>
                False<br>
                <br>
                <li><b>For flow to be turbulent the flow should be more than 400.</b></li>
                True<br>
                <br>
                <li><b>Concept of Reynolds number is used in open channels.</b></li>
                True<br>
                <br>
                <li><b>The behavior of path lines is laminar flow.</b></li>
                True<br>
                <li><b>If the Reynolds number is in between 2000 and 4000 then the flow is turbulent. </b></li>
                False<br>
                <br>
</ol>";
echo "</body></html>";
?>
