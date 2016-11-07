/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    //Variavel Global que guarda a chave do usuario logado
    var user_key;
    //Variavel Global que guarda a chave do time em uso
    var time_key;
     //Atualizar time sempre que a pagina time_home for carregada
    function atualiza_time(){
        var palavra_sql = "select * from time where id_time='"+time_key+"'";
        dati.query(palavra_sql,function(busca){
             var cliente = busca.rows.item(0);
             return cliente;
        });
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
    $(document).on("click", "#btnVoltarLogin", function(evt)
    {
         /*global activate_page */
         activate_page("#login"); 
         return false;
    });
    
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
        var sql = "select * from time where ID_USUARIO="+user_key;
        dati.query(sql,function(busca){
            if(busca.rows.length>0){
                var cliente = busca.rows.item(0);
                time_key = cliente.ID_TIME;
                activate_page("#admin_time");
                var time = atualiza_time();
                $("#admin_time_nometime").val() == time.NOME_TIME;
                $("#admin_time_leveltime").val() == time.LEVEL_TIME;
            }else{
                activate_page("#cadastra_time");
                $("#header_home").text("");
                $("#header_home").prepend('<h2>CADASTRAR TIME<h2>');
            }
        });
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
         activate_subpage("#cadastra_time"); 
         uib_sb.toggle_sidebar($("#overlapLateral"));
         return false;
    });
    
        /* button  #btn_salvar_cadastro */
    $(document).on("click", "#btn_salvar_cadastro", function(evt)
    {
        
            
        
        var registro = {
            "NOME": $("#cadastro_nome").val(),
            "EMAIL": $("#cadastro_email").val(),
            "SENHA": $("#cadastro_senha").val(),
        };
        
        dati.insert("tecnico", registro, function(codigo){
            //Msg de sucesso
            navigator.notification.alert("Tecnico #"+codigo+" cadastrado com sucesso!","INFO",null,"OK");
            //zerar variaveis
            $("#cadastro_nome").val("");
            $("#cadastro_email").val("");
            $("#cadastro_senha").val("");
            activate_subpage("#login"); 
        });
    });
    
        /* button  #btnEntrarLogin */
    $(document).on("click", "#btnEntrarLogin", function(evt)
    {
        var email_val = $("#email_login_campo").val();
        var senha_val = $("#senha_login_campo").val();   
        var sql = "select * from tecnico where SENHA='"+senha_val+"' and EMAIL='"+email_val+"'";
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
        });        
    });
    
        /* button  #btn_Conta */
    $(document).on("click", "#btn_Conta", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#admin_conta");  
         $("#header_home").text("");
         $("#header_home").prepend('<h2>GERENCIAR CONTA<h2>');
         var sql = "select * from tecnico where codigo='"+user_key+"'";
         dati.query(sql,function(busca){
             var cliente = busca.rows.item(0);
             $("#info_user").val('Nome: '+cliente.NOME+' \nEmail: '+cliente.EMAIL);
         });
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
        var sql = "select * from tecnico where codigo='"+user_key+"' and SENHA='"+admin_conta_senha_s+"'";
        dati.query(sql,function(busca){
            if(busca.rows.length==0){
                navigator.notification.alert("Senha Inválida","INFO",null,"OK");
                $("#admin_conta_senha_s").val("");
                $("#admin_conta_senha_ns").val("");
                $("#admin_conta_senha_c").val("");
            }else{
                if(admin_conta_senha_ns == admin_conta_senha_c){
                    dati.update("tecnico",{"SENHA":admin_conta_senha_ns},"CODIGO",user_key,function(status){
                        alert(status);
                    });
                    navigator.notification.alert("Senha alterada com sucesso.","INFORMAÇÃO",null,"OK");
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
            }
        });     
         return false;
    });
    
        /* button  #btnHome */
    
    
        /* button  #btnHome */
    $(document).on("click", "#btnHome", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_90_84"); 
         $("#header_home").text("");
         $("#header_home").prepend('<h2>PAGINA PRINCIPAL<h2>');
         return false;
    });
    
        /* button  #cadastra_time_cadastrar */
    $(document).on("click", "#cadastra_time_cadastrar", function(evt)
    {
        
        var cadastrotime = {
            "NOME_TIME": $("#cadastra_time_time").val(),
            "SIGLA_TIME": $("#cadastra_time_sigla").val(),
            "ID_USUARIO": $(user_key),
        };
        
        dati.insert("time", cadastrotime, function(id_time){
            //Msg de sucesso
            navigator.notification.alert("Time #"+id_time+" cadastrado com sucesso!","INFO",null,"OK");
            //zerar variaveis
            time_key = id_time;
            $("#cadastra_time_time").val("");
            $("#cadastra_time_sigla").val("");
            activate_subpage("#admin_time"); 
            var sql = "select * from time where id_time='"+time_key+"'";
            dati.query(sql,function(busca){
                var cliente = busca.rows.item(0);
                $("#admin_time_nometime").empty();
                $("#admin_time_leveltime").empty();
                $("#admin_time_nometime").prepend(cliente.NOME_TIME);
                $("#admin_time_leveltime").prepend("Level: "+cliente.LEVEL_TIME);
            });
        });
        $("#header_home").text("");
        // NAO CONSEGUI COLOCAR O NOME DO TIME NO HEADER
        $("#header_home").prepend('<h2>SEU TIME<h2>');
        return false;
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
