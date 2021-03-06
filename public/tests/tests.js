var assert = chai.assert;

suite('ELEMENTOS', function(){
  // Probar que bexec funciona 
  test('bexec()', function(){
    var input_str = "testeo";
	var regexp = /eo/;
	regexp.lastIndex = 0;

	assert.equal(regexp.bexec(input_str), null);
  });

// Probar String.tokens sobre una cadena.
  test('Cadena de Elementos', function(){
    var input_str = "var Laura = Tareq;";
    var esperado_str = "[{\"type\":\"ID\",\"value\":\"var\",\"from\":0,\"to\":3},{\"type\":\"ID\",\"value\":\"Laura\",\"from\":4,\"to\":9},{\"type\":\"=\",\"value\":\"=\",\"from\":10,\"to\":11},{\"type\":\"ID\",\"value\":\"Tareq\",\"from\":12,\"to\":17},{\"type\":\";\",\"value\":\";\",\"from\":17,\"to\":18}]";
	var resultado_str = JSON.stringify(input_str.tokens());

	assert.equal(esperado_str, resultado_str);
  });
  
   // Probar un error Cadena.
  test('Cadena de Elementos: error', function(){
    var input_str = "#ERROR#";
	var resultado_str = "Syntax error near '#ERROR#'";

    chai.expect(function () { input_str.tokens() }).to.throw(resultado_str);
  });
  
});

suite('Parser', function(){
  // Probamos el parser.
  test('Parser', function(){
	var input_str = "VAR x, area;     PROCEDURE areaare;  BEGIN     area = x * x  END;     BEGIN     x = 1;     WHILE x <= 10 DO     BEGIN        CALL areaare;        x = x + 1     END  END.";
	var result = window.parse(input_str);
	var esperado_str = "[\n    {\n        \"type\": \"Var ID\",\n        \"value\": \"x\"\n    },\n    {\n        \"type\": \"Var ID\",\n        \"value\": \"area\"\n    },\n    {\n        \"type\": \"Procedure\",\n        \"value\": \"areaare\",\n        \"left\": [\n            [\n                {\n                    \"type\": \"=\",\n                    \"left\": {\n                        \"type\": \"ID\",\n                        \"value\": \"area\"\n                    },\n                    \"right\": {\n                        \"type\": \"*\",\n                        \"left\": {\n                            \"type\": \"ID\",\n                            \"value\": \"x\"\n                        },\n                        \"right\": {\n                            \"type\": \"ID\",\n                            \"value\": \"x\"\n                        }\n                    }\n                }\n            ]\n        ]\n    },\n    [\n        {\n            \"type\": \"=\",\n            \"left\": {\n                \"type\": \"ID\",\n                \"value\": \"x\"\n            },\n            \"right\": {\n                \"type\": \"NUM\",\n                \"value\": 1\n            }\n        },\n        {\n            \"type\": \"WHILE\",\n            \"left\": {\n                \"type\": \"<=\",\n                \"left\": {\n                    \"type\": \"ID\",\n                    \"value\": \"x\"\n                },\n                \"right\": {\n                    \"type\": \"NUM\",\n                    \"value\": 10\n                }\n            },\n            \"right\": [\n                {\n                    \"type\": \"CALL\",\n                    \"value\": \"areaare\"\n                },\n                {\n                    \"type\": \"=\",\n                    \"left\": {\n                        \"type\": \"ID\",\n                        \"value\": \"x\"\n                    },\n                    \"right\": {\n                        \"type\": \"+\",\n                        \"left\": {\n                            \"type\": \"ID\",\n                            \"value\": \"x\"\n                        },\n                        \"right\": {\n                            \"type\": \"NUM\",\n                            \"value\": 1\n                        }\n                    }\n                }\n            ]\n        }\n    ]\n]";

	var resultado_str, tree;
    try {
      tree = parse(input_str);
      resultado_str = JSON.stringify(tree, null, 4);
    } catch (e) {
      resultado_str = JSON.stringify(e, null, 4);
    }

	assert.equal(esperado_str, resultado_str);
  });

test('Parser: Errores', function(){
  	var input_str = "A = *;";
	var esperado_str = "Syntax Error. Expected number or identifier or \'(\' but found * near \'*;\'";

    chai.expect(function () { window.parse(input_str) }).to.throw(esperado_str);
  });

});
  