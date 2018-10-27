<?php
$total=0;
$Q1 = $_POST['Q1'];
$Q2 = $_POST['Q2'];
$Q3 = $_POST['Q3'];
$Q4 = $_POST['Q4'];
$Q5 = $_POST['Q5'];
echo "You answered the following questions correctly : ";
if ($Q1==1)
{
$total=$total+1;
echo "1 ";
}
if ($Q2==2)
{
$total=$total+1;
echo "2 ";
}
if ($Q3==2)
{
$total=$total+1;
echo "3 ";
}
if ($Q4==1)
{
$total=$total+1;
echo "4 ";
}
if ($Q5==1)
{
$total=$total+1;
echo "5 ";
}
echo "\n\n\n\n";
echo "<html>
<head></head>";
echo "<body class=\"page_bg\">";
echo "<br>Total number of correct answers : ".$total."/8";
echo "  <h2>Correct Answers</h2>
<br>
<ol>
                <li><b>Venturimeter is used to measure average velocity </b></li>
                True<br>
                <br>
                <li><b>Angle of contraction is more than angle of diversion </b></li>
                False<br>
                <br>
                <li><b>The inlet length of the Venturimeter’s greater than outlet pipe</b></li>
                False<br>
                <br>
                <li><b>Actual discharge is obtained by (A)= a x h/t </b></li>
                True<br>
                <li><b>Coefficient of discharge is calculated by C_d =Q_a/Q_t  </b></li>
                True<br>
                <br>
</ol>";
echo "</body></html>";
?>