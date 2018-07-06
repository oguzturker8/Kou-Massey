function toggleAdvanced()
{
  $j('.advanced').toggle();
  $j('#hrefHide').toggle();
  $j('#hrefShow').toggle();
  
  if ($j('#advFilters').val() === '0') {
    $j('#advFilters').val('1');
  } else {
    $j('#advFilters').val('0');
  }
    
  $j('#academic_keywords').focus();
}


function toggleTips()
{
  $j('#search_tips_div').toggle();
}


function clearAdvanced()
{
  $j('#academic_college').val('0');
  $j('#academic_department').val('0');
  $j('#academic_output').val('0');
  $j('#academic_year').val('0');
}
