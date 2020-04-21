#!/usr/bin/php
<?php
$minify = true;
$time = gmdate('ymdHis');
exec('rm -rf "'.__DIR__.'/web/assets/js/" && mkdir "'.__DIR__.'/web/assets/js/"');
exec('rm -rf "'.__DIR__.'/web/assets/css/" && mkdir "'.__DIR__.'/web/assets/css/"');
require(__DIR__.'/vendor/autoload.php');
use MatthiasMullie\Minify;
if (!$debug)
{
	$minifier1 = new Minify\JS();
	$minifier2 = new Minify\CSS();
}
function catFiles($arrayOfFiles, $outputPath) {
    $dest = fopen($outputPath,"a");
    foreach ($arrayOfFiles as $f) {
        $FH = fopen($f,"r");
        $line = fgets($FH);
        while ($line !== false) {
            fputs($dest,$line);
            $line = fgets($FH);
        }
        fclose($FH);
    }
    fclose($dest);
}

$js = [
'assets/js/app.main.js',
'assets/js/app.debug.js',
'assets/js/watch.js',
];
$css = [
'assets/css/style.css',
];

// $minifier1->add(__DIR__.'/assets/js/fenki.js');
// $minifier1->add(__DIR__.'/assets/js/query.js');
	if (!$minify)
	{
		catFiles($js, __DIR__.'/web/assets/js/app.'.$time.'.js');
		catFiles($css, __DIR__.'/web/assets/css/style.'.$time.'.css');
	}
	else {
	foreach ($js as $k => $f) {
	$minifier1->add(__DIR__.'/'.$f);
	}
	foreach ($css as $k => $f) {
	$minifier2->add(__DIR__.'/'.$f);
	}
	$minifier1->minify(__DIR__.'/web/assets/js/app.'.$time.'.js');
	$minifier2->minify(__DIR__.'/web/assets/css/style.'.$time.'.css');
	}
$f = file_get_contents(__DIR__.'/assets/html/index.html');
$f = str_replace(['{{time}}','{{debug}}'], [$time,$debug], $f);
file_put_contents(__DIR__.'/web/index.html', $f);


// Service Workers
// $f = file_get_contents(__DIR__.'/assets/sw.js');
// $f = str_replace('{{time}}', $time, $f);
// file_put_contents(__DIR__.'/web/sw.js', $f);

file_put_contents(__DIR__.'/web/assets/ver.json', '{"app_ver":'.$time."}");
echo "new chain generated! {{time}} = $time \n";
?>
