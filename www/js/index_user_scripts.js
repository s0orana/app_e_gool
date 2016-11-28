/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    var mysql_value;
    //Variavel Global que guarda a chave do usuario logado
    var user_key;
    //Variavel Global que guarda a chave do time em uso
    var time_key;
    //Entrega valor random
    var url = "http://localhost/conecta/conexao_post.php";
    function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    }
     
     /* button  #btnLogin */
    $(document).on("click", "#btnLogin", function(evt)
    {
         /*global activate_page */
         activate_page("#login"); 
         return false;
    });
    
        /* button  #btnCadastrar */
    $(document).on("click", "#btnCadastrar", function(evt)
    {
         /*global activate_page */
         activate_page("#cadastro"); 
         return false;
    });
    
        /* button  #btnRealizarLogin */
    $(document).on("click", "#btnRealizarLogin", function(evt)
    {
         /*global activate_page */
         activate_page("#login"); 
         return false;
    });
    
        /* button  #btnCadastrarConta */
    $(document).on("click", "#btnCadastrarConta", function(evt)
    {
         /*global activate_page */
         activate_page("#cadastro"); 
         return false;
    });
    
        /* button  #btnVoltarMain */
    $(document).on("click", "#btnVoltarMain", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
         return false;
    });
    
        /* button  #btnVoltarLogin */
    
    
        /* button  #btnEsqueciSenha */
    $(document).on("click", "#btnEsqueciSenha", function(evt)
    {
         /*global activate_page */
         activate_page("#esqueceu_senha"); 
         return false;
    });
    
        /* button  #btnMenu */
    $(document).on("click", "#btnMenu", function(evt)
    {
         /*global uib_sb */
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        
         uib_sb.toggle_sidebar($("#overlapLateral"));  
         return false;
    });
    
        /* button  #btnVoltarEsqueceuSenhaLogin */
    $(document).on("click", "#btnVoltarEsqueceuSenhaLogin", function(evt)
    {
         /*global activate_page */
         activate_page("#login"); 
         return false;
    });
    
        /* button  #btnEntrarLogin */
    
    
        /* button  #btnFechar */
    $(document).on("click", "#btnFechar", function(evt)
    {
         /*global uib_sb */
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        
         uib_sb.toggle_sidebar($("#overlapLateral"));  
         return false;
    });
    
        /* button  #button_enviar_nome */
    $(document).on("click", "#button_enviar_nome", function(evt)
    {
        
        
        navigator.notification.alert("Time Criado com Sucesso!!","info","ok"); 
        /*var text = $(document).getElementById('nome_time').value;
        $(document).getElementById('nome_time_texto').value = text;
         
         return false;
         */
    });
    
        /* listitem  #lstCadastrarTime */
    $(document).on("click", "#lstCadastrarTime", function(evt)
    {
        //SELECT PARA DESCOBRIR QUAL O ID QUE O TIME RECEBEU
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "http://localhost/conecta/conexao_get.php?get_rows=consulta_id_time&id_cliente="+user_key, false);
                    xhr.onload = function(){
                        alert(xhr.responseText);
                        if(xhr.status == 200)
                        {
                            var json_string = xhr.responseText;
                            var json = JSON.parse(json_string);
                            if(json.rows.length > 0){
                                time_key = parseInt(json.rows[0][0]);
                                activate_subpage("#admin_time");
                                $("#header_home").text("");
                                $("#header_home").prepend('<h2>'+json.rows[0][1]+'<h2>');
                                $("#admin_time_nometime").text(json.rows[0][1]);
                                $("#admin_time_leveltime").text('Level '+json.rows[0][2]);
                            }else{
                                activate_subpage("#cadastra_time");
                            }
                        }
                        else if(xhr.status == 404)
                        {   
                            navigator.notification.alert("Web Service Doesn't Exist",null,'Success','OK');
                        }
                        else
                        {
                            navigator.notification.alert("Unknown error occured while connecting to server",null,'Success','OK');
                        }
                    }
                    xhr.send();

        
         uib_sb.toggle_sidebar($("#overlapLateral"));
         return false;
    });
    
        /* button  #btn_salvar_cadastro */
    $(document).on("click", "#btn_salvar_cadastro", function(evt)
    {
        var recupera = $("form#cadastro_tecnico").serialize();
        evt.preventDefault();
        
        
        $.ajax({
			   type: "POST",
			   url: url,
			   data: recupera+"&acao=cadastro",
			   async: false
		    }).done(function(){			 
				navigator.notification.alert("Treinador Cadastrado!",null,'Success','OK');
                
		    }).fail(function(){
			   navigator.notification.alert("Erro ao conectar ao servidor!",null,'Danger','OK');
             });
        /*
        dati.insert("tecnico", registro, function(codigo){
            //Msg de sucesso
            navigator.notification.alert("Tecnico #"+codigo+" cadastrado com sucesso!","INFO",null,"OK");
            //zerar variaveis
            $("#cadastro_nome").val("");
            $("#cadastro_email").val("");
            $("#cadastro_senha").val("");
            activate_subpage("#login"); 
        });*/
    });
    
        /* button  #btnEntrarLogin */
    $(document).on("click", "#btnEntrarLogin", function(evt)
    {
        var email_val = $("#email_login_campo").val();
        var senha_val = $("#senha_login_campo").val();   
        var recupera = $("form#login").serialize(); 
        //var sql = "sql=select * from tecnico where SENHA='"+senha_val+"' and EMAIL='"+email_val+"'";
        
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost/conecta/conexao_get.php?get_rows=login&email="+email_val+"&senha="+senha_val, false);
        xhr.onload = function(){
            alert(xhr.responseText);
            if(xhr.status == 200)
            {
                var json_string = xhr.responseText;
                var json = JSON.parse(json_string);
                if(json.rows.length > 0){
                    navigator.notification.alert("Bem Vindo " + json.rows[0][1],null,'Success','OK');
                    $("#info_user").val('Nome: '+json.rows[0][1]+' \nEmail: '+json.rows[0][2]);
                    user_key = parseInt(json.rows[0][0]);
                    activate_subpage("#page_90_84"); 
                    $("#header_home").text("");
                    $("#header_home").prepend('<h2>MENU INICIAL<h2>');
                }
                else{
                    navigator.notification.alert('Usuario não encontrado',null,'Erro','OK');
                }
            }
            else if(xhr.status == 404)
            {
                navigator.notification.alert("Web Service Doesn't Exist",null,'Success','OK');
            }
            else
            {
                navigator.notification.alert("Unknown error occured while connecting to server",null,'Success','OK');
            }
        }
        xhr.send();
        
		
    });
        
        
        
        /*
        dati.query(sql,function(busca){
            if(busca.rows.length>0){
                var cliente = busca.rows.item(0);
                navigator.notification.alert("Bem Vindo "+cliente.NOME,"INFO",null,"OK");
                user_key = cliente.CODIGO;
                activate_subpage("#page_90_84"); 
                $("#header_home").text("");
                $("#header_home").prepend('<h2>PAGINA PRINCIPAL<h2>');
            }else{
                navigator.notification.alert("Nenhum registro encontrado.","INFORMAÇÃO",null,"OK");
            }
        });*/        
    
        /* button  #btn_Conta */
    $(document).on("click", "#btn_Conta", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_conta");  
         $("#header_home").text("");
         $("#header_home").prepend('<h2>GERENCIAR CONTA<h2>');
       return false;
    });
     /* button  #admin_conta_alt_senha */
    $(document).on("click", "#admin_conta_alt_senha", function(evt)
    {
         /*global activate_page */
         activate_page("#admin_conta_senha"); 
         return false;
    });
    
        /* button  #btn_alterar_voltar */
    $(document).on("click", "#btn_alterar_voltar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_conta"); 
         return false;
    });
    
        /* button  #btn_alterar_senha */
    $(document).on("click", "#btn_alterar_senha", function(evt)
    {
        var admin_conta_senha_s = $("#admin_conta_senha_s").val();
        var admin_conta_senha_ns = $("#admin_conta_senha_ns").val();
        var admin_conta_senha_c = $("#admin_conta_senha_c").val();
        var recupera = $("form#altera_senha").serialize();
        
            
                if(admin_conta_senha_ns == admin_conta_senha_c){
                    $.ajax({
                    type: "POST",
			        url: url,
			        data: recupera + "table=tecnico&col=senha&where=codigo&valwhere="+user_key+"&acao=update&val="+admin_conta_senha_ns
		            }).done(function(){			 
				    navigator.notification.alert("Senha alterada com Sucesso!",null,'Success','OK');
                
                    }).fail(function(){
			        navigator.notification.alert("Erro ao conectar ao servidor!",null,'Danger','OK');
                    });
                    
                    $("#admin_conta_senha_s").val("");
                    $("#admin_conta_senha_ns").val("");
                    $("#admin_conta_senha_c").val("");
                    activate_subpage("#admin_conta"); 
                }else{
                    navigator.notification.alert("Senhas digitadas não batem","INFORMAÇÃO",null,"OK");
                    $("#admin_conta_senha_s").val("");
                    $("#admin_conta_senha_ns").val("");
                    $("#admin_conta_senha_c").val("");
                }  
            
            
         return false;
    
    });
    
        /* button  #btnHome */
    
    
        /* button  #btnHome */
    $(document).on("click", "#btnHome", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_90_84"); 
         uib_sb.toggle_sidebar($("#overlapLateral"));
         $("#header_home").text("");
         $("#header_home").prepend('<h2>MENU INICIAL<h2>');
         return false;
    });
    
        /* button  #cadastra_time_cadastrar */
    $(document).on("click", "#cadastra_time_cadastrar", function(evt)
    {
        
        var cadastrotime = {
            "NOME_TIME": $("#cadastra_time_time").val(),
            "SIGLA_TIME": $("#cadastra_time_sigla").val(),
        };
        
        var valor = toString("id_user="+user_key+"&nome="+cadastrotime.NOME_TIME+"&sigla="+cadastrotime.SIGLA_TIME+"&acao=insert_time");
        
        $.ajax({
                    type: "POST",
			        url: url,
			        data: "id_user="+user_key+"&nome="+cadastrotime.NOME_TIME+"&sigla="+cadastrotime.SIGLA_TIME+"&acao=insert_time"
		            }).done(function(){			 
				    navigator.notification.alert("Time "+cadastrotime.NOME_TIME+" cadastrado com sucesso!",null,'Success','OK');
                    //SELECT PARA DESCOBRIR QUAL O ID QUE O TIME RECEBEU
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "http://localhost/conecta/conexao_get.php?get_rows=consulta_id_time&id_cliente="+user_key, false);
                    xhr.onload = function(){
                        alert(xhr.responseText);
                        if(xhr.status == 200)
                        {
                            var json_string = xhr.responseText;
                            var json = JSON.parse(json_string);
                            if(json.rows.length > 0){
                                time_key = parseInt(json.rows[0][0]);
                                $("#cadastra_time_time").val("");
                                $("#cadastra_time_sigla").val("");
                                activate_subpage("#admin_time"); 
                            }
                            else{
                                navigator.notification.alert('ERRO no SELECT_TIME',null,'Erro','OK');
                            }
                        }
                        else if(xhr.status == 404)
                        {   
                            navigator.notification.alert("Web Service Doesn't Exist",null,'Success','OK');
                        }
                        else
                        {
                            navigator.notification.alert("Unknown error occured while connecting to server",null,'Success','OK');
                        }
                    }
                    xhr.send();
                    var jogadores = ["Aaren","Aarika","Abagael","Abagail","Abbe","Abbey","Abbi","Abbie","Abby","Abbye","Abigael","Abigail","Abigale","Abra","Ada","Adah","Adaline","Adan","Adara","Adda","Kate","Katee","Katerino",    "Katerine","Katey","Kath","Katha","Katharina","Katharine","Katharyn","Kathe"];
                    var posicao = ["Goleiro","Zagueiro","Meio Campo","Atacante"];
                    var valor = 0;
                    while(valor < jogadores.length){
                            var rand_posicao = posicao[Math.floor(Math.random() * posicao.length)];
                            var registro = {
                                    "ID_TIME": time_key,
                                    "NOME_JOGADOR": jogadores[valor],
                                    "APELIDO_JOGADOR": jogadores[valor],
                                    "IDADE_JOGADOR": getRandomInt(18,40),
                                    "LEVEL_JOGADOR": getRandomInt(0,40),
                                    "POSICAO_JOGADOR": rand_posicao,
                            };
                        var script = "id_time="+registro.ID_TIME+"&nome_jogador="+registro.NOME_JOGADOR+"&apelido_jogador="+registro.APELIDO_JOGADOR+"&idade_jogador="+registro.IDADE_JOGADOR+"&level_jogador="+registro.LEVEL_JOGADOR+"&posicao_jogador="+registro.POSICAO_JOGADOR;
                    $.ajax({
			         type: "POST",
			         url: url,
                     data: script + "&acao=insert_jogador", 
                     async: false
		            }).done(function(){		
		            }).fail(function(){
			            navigator.notification.alert("Erro ao conectar ao servidor!",null,'Danger','OK');
                    });
                    valor = valor + 1;    
                    }
                    }).fail(function(){
			        navigator.notification.alert("Erro ao conectar ao servidor!",null,'Danger','OK');
                    });
   
        $("#header_home").text("");
        $("#header_home").prepend('<h2>'+cadastrotime.NOME_TIME+'<h2>');
        return false;
    });
    
        /* button  #admin_time_jogadores */
    $(document).on("click", "#admin_time_jogadores", function(evt)
    {
        activate_page("#time_jogadores");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost/conecta/conexao_get.php?get_rows=consulta_jogadores&id_time="+time_key, false);
        xhr.onload = function(){
            alert(xhr.responseText);
            if(xhr.status == 200)
            {
                var json_string = xhr.responseText;
                var json = JSON.parse(json_string);
                $("#time_jogadores_header").text("");
                $("#time_jogadores_header").prepend('<h2>JOGADORES<h2>');
                if(json.rows.length > 0){
                    var contador = (json.rows.length) -1 ;
                    while(contador >= 0){  
                        $("#time_jogadores_0").prepend("<br>Jogador "+(contador+1)+"<br>Nome: "+ json.rows[contador][2]+"<br> Apelido: "+json.rows[contador][3]+"<br>Idade: "+json.rows[contador][4]+"<br>Level: "+json.rows[contador][5]+"<br>Posicao: "+json.rows[contador][6]+"<br><hr color=blue>");
                        contador = contador-1;
                    }
                }
            }
            else if(xhr.status == 404)
            {
                navigator.notification.alert("Web Service Doesn't Exist",null,'Success','OK');
            }
            else
            {
                navigator.notification.alert("Unknown error occured while connecting to server",null,'Success','OK');
            }
        }
        xhr.send();
        return false;
    });
    
        /* button  #time_jogadores_voltar */
    $(document).on("click", "#time_jogadores_voltar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_time"); 
         return false;
    });
    
        /* listitem  #lstLigas */
    $(document).on("click", "#lstLigas", function(evt)
    {
        /*global activate_subpage */
        activate_subpage("#admin_ligas"); 
        uib_sb.toggle_sidebar($("#overlapLateral"));
        $("#header_home").text("");
        $("#header_home").prepend('<h2>LIGAS<h2>');
         return false;
    });
    
        /* button  #admin_ligas_rapida */
    
    
        /* button  #chat_voltar */
    $(document).on("click", "#chat_voltar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_90_84"); 
         return false;
    });
    
        /* button  #chat_apagar */
    $(document).on("click", "#chat_apagar", function(evt)
    {
        $("#chat_palavra").val(""); 
        return false;
    });
    
        /* button  #chat_enviar */
    $(document).on("click", "#chat_enviar", function(evt)
    {   
        var palavra = "select * from tecnico where codigo='" + user_key +"'";
        dati.query(palavra,function(search){
        var busca = search.rows.item(0);
        var chat_palavra = $("#chat_palavra").val();
        $("#chat_texto").append(busca.NOME +': ' + chat_palavra + '<br>')
        $("#chat_palavra").val("");
        });
        return false;
    });
    
        /* listitem  #lstChat */
    $(document).on("click", "#lstChat", function(evt)
    {
        activate_page("#chat_home"); 
        $("#chat_home_header").text("");
        $("#chat_home_header").prepend('<h2>CHAT GLOBAL<h2>');
        return false;
    });
    
        /* button  #amigos_home_buscar */
    $(document).on("click", "#amigos_home_buscar", function(evt)
    {
        navigator.notification.alert("Tecnico "+$("#amigos_home_amigo").val()+" não encontrado.","INFO",null,"OK");
         return false;
    });
    
        /* listitem  #lstAmigos */
    
    
        /* button  #admin_ligas_rapida */
    $(document).on("click", "#admin_ligas_rapida", function(evt)
    {
        /* your code goes here */ 
         return false;
    });
    
        /* button  #mysql_abre */
    $(document).on("click", "#mysql_abre", function(evt)
    {
         /*global activate_page */
         activate_page("#Mysql"); 
         return false;
    });
    
        /* button  #mysql_volta */
    $(document).on("click", "#mysql_volta", function(evt)
    {
         /*global activate_page */
         activate_page("#login"); 
         return false;
    });
    
        /* button  #cadastra_liga_voltar */
    $(document).on("click", "#cadastra_liga_voltar", function(evt)
    {
         /*global activate_page */
         activate_page("#home"); 
         return false;
    });
    
        /* button  #cadastra_liga_amigos */
    $(document).on("click", "#cadastra_liga_amigos", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#cadastra_liga_page_amigos"); 
         return false;
    });
    
        /* button  #admin_ligas_cadastrar */
    $(document).on("click", "#admin_ligas_cadastrar", function(evt)
    {
        activate_page("#cadastra_liga"); 
        $("#cadastra_liga_header").text("");
        $("#cadastra_liga_header").prepend('<h2>CHAT GLOBAL</h2>');
        return false;
    });
    
        /* button  #cadastra_liga_amigo_voltar */
    $(document).on("click", "#cadastra_liga_amigo_voltar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_3_27"); 
         return false;
    });
    
        /* button  #cadastra_liga_gerar */
    $(document).on("click", "#cadastra_liga_gerar", function(evt)
    {
        var campeonato = ("#cadastra_liga_campeonato").val();
        var jogos = ("#cadastra_liga_qtd").val();
        return false;
    });
    
    $(document).on("click", "#lstJogar", function(evt)
    {
         /*global activate_page */
         activate_page("#admin_jogar"); 
         uib_sb.toggle_sidebar($("#overlapLateral"));
         $("#header_admin_jogar").text("");
         $("#header_admin_jogar").prepend("<h2>JOGOS</h2>");
         return false;
    });
    
        /* button  #admin_jogar_voltar */
    
    
        /* button  #simula_partida_voltar */
    $(document).on("click", "#simula_partida_voltar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_37_78"); 
         return false;
    });
    
        /* button  #simula_partida_jogar */
    $(document).on("click", "#simula_partida_jogar", function(evt)
    {
        /* your code goes here */ 
         return false;
    });
    
        /* button  #admin_jogar_simular */
    $(document).on("click", "#admin_jogar_simular", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_jogar_simular_partida"); 
         return false;
    });
    
        /* button  #admin_jogar_ir_agenda */
    $(document).on("click", "#admin_jogar_ir_agenda", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_jogar_agenda"); 
         return false;
    });
    
        /* button  #admin_jogar_ir_proximo_jogo */
    $(document).on("click", "#admin_jogar_ir_proximo_jogo", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_jogar_proximo_jogo"); 
         return false;
    });
    
        /* button  #admin_jogar_ir_jogo_anterior */
    $(document).on("click", "#admin_jogar_ir_jogo_anterior", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_jogar_jogo_anterior"); 
         return false;
    });
    
        /* button  #admin_jogar_ir_estatisticas */
    $(document).on("click", "#admin_jogar_ir_estatisticas", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_jogar_estatisticas"); 
         return false;
    });
    
        /* button  #admin_jogar_menu_principal */
    $(document).on("click", "#admin_jogar_menu_principal", function(evt)
    {
         /*global activate_page */
         activate_page("#home"); 
         $("#header_home").text("");
         $("#header_home").prepend('<h2>MENU INICIAL<h2>');
         return false;
    });
    
        /* button  #admin_jogar_voltar */
    $(document).on("click", "#admin_jogar_voltar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_37_78"); 
         return false;
    });
    
        /* button  #admin_time_treinamento_voltar */
    $(document).on("click", "#admin_time_treinamento_voltar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_time"); 
         return false;
    });
    
        /* button  #foco_equilibrado */
    $(document).on("click", "#foco_equilibrado", function(evt)
    {
        navigator.notification.alert("O foco de Treinamento foi alterado para Equilibrado, isso ira custar $1000/mes","INFO",null,"OK");
        $("#admin_time_treino_status").val("FOCO EM TREINO ATUAL -EQUILIBRADO-")
        return false;
    });
    
        /* button  #admin_time_ir_treinamento */
    $(document).on("click", "#admin_time_ir_treinamento", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_time_treinamento"); 
         return false;
    });
    
        /* button  #foco_atacante */
    $(document).on("click", "#foco_atacante", function(evt)
    {
        navigator.notification.alert("O foco de Treinamento foi alterado para Atacante, isso ira custar $900/mes","INFO",null,"OK");
        $("#admin_time_treino_status").val("FOCO EM TREINO ATUAL -ATACANTE-")
        return false;
    });
    
        /* button  #foco_goleiro */
    $(document).on("click", "#foco_goleiro", function(evt)
    {
        navigator.notification.alert("O foco de Treinamento foi alterado para Goleiro, isso ira custar $600/mes","INFO",null,"OK");
        $("#admin_time_treino_status").val("FOCO EM TREINO ATUAL -GOLEIRO-")
        return false;
    });
    
        /* button  #foco_meio_campo */
    $(document).on("click", "#foco_meio_campo", function(evt)
    {
        navigator.notification.alert("O foco de Treinamento foi alterado para Meio Campo, isso ira custar $500/mes","INFO",null,"OK");
        $("#admin_time_treino_status").val("FOCO EM TREINO ATUAL -MEIO CAMPO-")
         return false;
    });
    
        /* button  #foco_zagueiro */
    $(document).on("click", "#foco_zagueiro", function(evt)
    {
        navigator.notification.alert("O foco de Treinamento foi alterado para zagueiro, isso ira custar $300/mes","INFO",null,"OK");
        $("#admin_time_treino_status").val("FOCO EM TREINO ATUAL -ZAGUEIRO-")
        return false;
    });
    
        /* button  #btnVoltarLogin */
    $(document).on("click", "#btnVoltarLogin", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
         return false;
    });
    
        /* button  #time_financeiro_voltar */
    $(document).on("click", "#time_financeiro_voltar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_time"); 
         return false;
    });
    
        /* button  #time_formacao_voltar */
    $(document).on("click", "#time_formacao_voltar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_time"); 
         return false;
    });
    
        /* button  #442 */
    $(document).on("click", "#442", function(evt)
    {
        $("#time_formacao_atual").val("4-4-2");  
         return false;
    });
    
        /* button  #433 */
    $(document).on("click", "#433", function(evt)
    {
        $("#time_formacao_atual").val("4-3-3");  
         return false;
    });
    
        /* button  #541 */
    $(document).on("click", "#541", function(evt)
    {
        $("#time_formacao_atual").val("5-4-1");  
         return false;
    });
    
        /* button  #343 */
    $(document).on("click", "#343", function(evt)
    {
        $("#time_formacao_atual").val("3-4-3"); 
         return false;
    });
    
        /* button  #451 */
    $(document).on("click", "#451", function(evt)
    {
        $("#time_formacao_atual").val("4-5-1");  
        return false;
    });
    
        /* button  #253 */
    $(document).on("click", "#253", function(evt)
    {
        $("#time_formacao_atual").val("2-5-3"); 
        return false;
    });
    
        /* button  #admin_time_ir_formacao */
    $(document).on("click", "#admin_time_ir_formacao", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_time_formacao"); 
         return false;
    });
    
        /* button  #admin_time_ir_financeiro */
    
    
        /* button  #admin_time_ir_financeiro */
    $(document).on("click", "#admin_time_ir_financeiro", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_time_financeiro"); 
         return false;
    });
    
        /* button  #admin_ligas_voltar */
    $(document).on("click", "#admin_ligas_voltar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_ligas"); 
         return false;
    });
    
        /* button  #admin_ligas_ir_procurar */
    $(document).on("click", "#admin_ligas_ir_procurar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_ligas_procurar"); 
         return false;
    });
    
        /* button  #lst_logoff */
    $(document).on("click", "#lst_logoff", function(evt)
    {
        user_key = null;
        time_key = null;
        activate_subpage("#main_page"); 
        return false;
    });
    
        /* listitem  #lstAmigos */
    $(document).on("click", "#lstAmigos", function(evt)
    {
        activate_subpage("#admin_adiciona_amigos");
        $("#header_home").text("");
        $("#header_home").prepend('<h2>AMIGOS<h2>');
        uib_sb.toggle_sidebar($("#overlapLateral"));
        
         return false;
    });
    
        /* button  #add_amigo_listar */
    $(document).on("click", "#add_amigo_listar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#amigos_home"); 
         return false;
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
