<?php
$total=0;
$Q1 = $_POST['Q1'];
$Q2 = $_POST['Q2'];
$Q3 = $_POST['Q3'];
$Q4 = $_POST['Q4'];
echo "You answered the following questions correctly : ";
if ($Q1==1)
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
if ($Q4==2)
{
$total=$total+1;
echo "4 ";
}
echo "\n\n\n\n";
echo "<html>
<head></head>";
echo "<body class=\"page_bg\">";
echo "<br>Total number of correct answers : ".$total."/8";
echo "	<h2>Correct Answers</h2>
<br>
<ol>
	        <li><b>Bernoulli’s equation holds good for non ideal fluids </b></li>
                True<br>
                <br>
                <li><b>The pressure head is given by</b></li>
                P/γ<br>
                <br>
                <li><b>Incompressible ideal fluids are fluids which have constant density. </b></li>
                True<br>
                <br>
                <li><b>Bernoulli’s theorem deals with law conservation of momentum </b></li>
                False<br>
                <br>
</ol>";
echo "</body></html>";
?>
