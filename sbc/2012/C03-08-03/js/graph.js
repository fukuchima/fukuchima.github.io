$(function(){
	// グラフを表示する先の要素を指定
	var target = document.getElementById('graph');
	
	// 描画領域
	var width = 820;
	var height = 350;
	
	// ラベル
	var label_w = 40;
	var label_h = 40;

	// データを配列で登録
	var data = [
		7913, 7494, 7376, 7296, 8585, 9103, 8534, 10171, 10118, 8360, 7848, 7855, 9290, 9158, 8871, 9210, 8738, 9148, 9113, 9370, 8914, 8965, 9065, 8780, 7768, 8946, 9644, 8865, 8831, 8826, 8337
	];

	// svg要素を作成
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', width);
	svg.setAttribute('height', height);

	// polyline（多角線）要素を作成
	var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');

	// データから角の座標を設定（描画領域に収まる比率に変更）
	var x_ratio = 25;
	var y_ratio = 50;
	var line = '';
	for(var i in data){
		var x = label_w + (i*x_ratio);
		var y = (height-(data[i]/y_ratio));
		line += x+','+y+' ';	// "x1,y1 x2,y2" という書式にする
	}

	// polylineにpointsを設定
	polyline.setAttribute('points', line);

	var interval = 2000;
	var i = 0;
	while(1){
		// 補助線を作成(Y)
		var line_x = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		var y  = height - (i * (interval/y_ratio));
		line_x.setAttribute('x1', label_w);
		line_x.setAttribute('y1', y);
		line_x.setAttribute('x2', width);
		line_x.setAttribute('y2', y);

		// svg要素の中に入れる
		svg.appendChild(line_x);

		// ラベルを作成(Y)
		var label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		label.setAttribute('x', 30);
		label.setAttribute('y', y);
		label.setAttribute('class', 'labelY');
		label.textContent = (interval*i);

		// svg要素の中に入れる
		svg.appendChild(label);

		// 描画領域を超える位置に線が来たらループ処理から抜ける
		if(y < 0){
			break;
		}
		i++;
	}

	// svg要素の中に入れる
	svg.appendChild(polyline);

	for(var i in data){
		// polylineの角に円を作成
		var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		x = label_w + i * x_ratio;
		y = height - (data[i]/y_ratio);
		circle.setAttribute('cx', x);
		circle.setAttribute('cy', y);
		circle.setAttribute('r', '5');
		circle.setAttribute('title', (~~(i)+1)+'日：'+data[i]+'view');

		// svg要素の中に入れる
		svg.appendChild(circle);

		// ラベルを作成(日)
		var label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		label.setAttribute('x', x-10);
		label.setAttribute('y', y-10);
		label.setAttribute('class', 'labelX');
		label.textContent = (~~(i)+1+'日');

		// svg要素の中に入れる
		svg.appendChild(label);
	}

	// グラフを表示
	target.appendChild(svg);

	// ツールチップを表示
	$('#graph circle').powerTip({placement: 'se'});
});
