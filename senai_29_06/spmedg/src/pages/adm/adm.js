import { React, Component, ReactTimeAgo } from 'react';
import axios from 'axios';



//IMAGENS
import style from '../../assets/css/style.css'
import logopm from '../../assets/img/logopm.png';
import perfil from '../../assets/img/perfil.png';
import medico from '../../assets/img/medicon.png';
import calendario from '../../assets/img/calendario.png';
import relogio from '../../assets/img/relogio.png';
import paciente from '../../assets/img/paciicon.png';
import status from '../../assets/img/status.png';
import especialidade from '../../assets/img/especiali.png';
import x from '../../assets/img/x.png';



import login from '../home/login';


function apdiv() {

 document.getElementById("esnv").style.display = "block"

};

function esdiv() {

 document.getElementById("esnv").style.display = "none"

};

function dia() {

    var dia= document.getElementById('dia');
    for(var i = 1; i <= 31; i++){
        dia.innerHTML+='<option value="'+i+'">'+i+'</option>'; }

};

function ano() {
    var ano = document.getElementById('ano');
   
        for(var i = 1919; i <= 2021; i++){
            ano.innerHTML+='<option value="'+i+'">'+i+'</option>'; }
                
        
}


class adm extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaConsultas : [],
            nomeUsuario : '',
            idConsulta : 2,
            idPaciente :0,
            idMedico:0,
            nomeEspecialidade:'',
            nome:'',
            foto:'',
            horaConsulta:'',
            dataConsulta: '',
            situacao: ''
        }
    }

 


    buscarConsultas = () => {
        
        axios('http://localhost:5000/api/consultas', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta => {
            // Caso a requisição retorne um status code 200,
            if (resposta.status === 200) {
                // atualiza o state listaEventos com os dados obtidos
                this.setState({ listaConsultas : resposta.data })
                // e mostra no console do navegador a lista de eventos
                console.log(this.state.listaConsultas);
            }
        })
        // Caso ocorra algum erro, mostra no console do navegador
        .catch(erro => console.log(erro))
    }


        // Função que faz a chamada para a API para cadastrar um evento
        cadastrarConsulta = (event) => {
        // Ignora o comportamento padrão do navegador
        event.preventDefault();
        // Define que a requisição está em andamento
        this.setState({ isLoading : true });

        // Define um evento que recebe os dados do state
        // É necessário converter o acessoLivre para int, para que o back-end consiga converter para bool ao cadastrar
        // Como o navegador envia o dado como string, não é possível converter para bool implicitamente
        let consulta = {
            paciente : this.state.idPaciente,
            medico : this.state.idMedico,
            dataConsulta : new Date( this.state.dataConsulta),
            situacao: this.state.situacao,
        };

        // Define a URL e o corpo da requisição
        axios.post('http://localhost:5000/api/Consultas', consulta, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        // Verifica o retorno da requisição
        .then(resposta => {
            // Caso retorne 201,
            if (resposta.status === 201) {
                // exibe no console do navegador a mensagem abaixo
                console.log('Consulta cadastrado!');
                // e define que a requisição terminou
                this.setState({ isLoading : false });
            }
        })

        // Caso ocorra algum erro, exibe este erro no console do navegador
        .catch(erro => {
            console.log(erro);
            // e define que a requisição terminou
            this.setState({ isLoading : false });
        })

        // Então, atualiza a lista de eventos
        // sem o usuário precisar executar outra ação
        .then(this.buscarConsultas)
    };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name] : campo.target.value })
    };

    componentDidMount(){
        this.buscarConsultas();
    };

    render(){
        return(
            <div>
                <header>
                       
                        <div className="cabecalho">
                        <div className="logo" >
                            <a><img id="imgl" src={logopm} alt="Logo SP Medical Group"/></a>
                        </div>
        
                    <div className="menu">                       
                        <div className="lemenu">
                            <a href=""><button id="m" >Início</button></a>
                            <a href=""><button id="m" >Especialidades</button></a>
                            <a href=""><button id="m" >Contatos</button></a>
                        </div>       
                    </div>
        
                
                    <nav>
                        <input type="checkbox" id="check"/>
                            <label for="check" className="checkbtn" id="check1">
                                <i className="fas fa-bars"></i>
                            </label>
                        <ul>
                            <div className="menu12" >
                                <li id="mic1"><a href="#">Consultas</a></li>
                                <li id="mic"><a href="#">Minha Conta</a></li>
                                <div className="linha_m"></div>
                            <li><a href="#"  className="vertical-menu">Eu</a></li>
                           </div>
                        </ul>
                    </nav>
                    <section></section>
                    </div>
                </header>
          
            
            <div className="dis">
            
                <main className="estrutura_lm">
                
                <div className="dis1">

               

                        <img src={perfil} id="ftperfil" alt="Imagem perfil"/>
                        {/* <input type="file" id="ftperfil" onblur="carregarFoto(this.value.foto)"></input> */}
                        <div className="colu">
                            <h5 > &nbsp; ADM</h5>
                            <h6>Consultas</h6>
                            <button onClick={apdiv} type="button" id="nova" value= "novaconsulta">+ Nova Consulta</button>
                        </div>

                        <div  className="estrutura_nv" id="esnv"  >
                            <img onClick={esdiv} src={x} id="x"  alt="Icone fechar agendamento de consulta"></img>
                            <h2 className="h2nv" >Agendar</h2>
                            <h3 id="h3" >Nova Consulta</h3>
         
                            <form onSubmit={this.cadastrarConsulta}>
                                <div className="input-field">
                                    <input   value={this.state.idMedico.medico}
                                     onChange={this.atualizaStateCampo}
                                    type="text" name="medico" id="nome"
                                    placeholder=" ID Médico" />
                                    <div class="linha"></div> 
                                </div>

                                <div className="input-field">
                                    <input   value={this.state.idPaciente.paciente}
                                     onChange={this.atualizaStateCampo}
                                    type="text" name="paciente" id="nome"
                                    placeholder="ID Paciente" />
                                    <div class="linha"></div> 
                                </div>

                                <h4 id="h4" >Status</h4>

                                <div className="input-field">
                                    <select className="selectnv" id="select">
                                        <option value="1">Realizada</option>
                                        <option value="2">Agendada</option>
                                        <option value="3">Cancelada</option>    
                                    </select>
                                </div>

                                <h4 id="h4" >Data/Hora</h4>
                                <div class="select3">

                                    <select id={dia} value="date" name = "dia" id="dia" >
                                        
                                        <option >Dia</option>
                                            
                                    </select>

                                    <select id="mes" name="Mês"  >
                                        
                                        <option>Mês </option>
                                        <option value="01">Janeiro  </option>
                                        <option value="02">Fevereiro</option>
                                        <option value="03">Março    </option>
                                        <option value="04">Abril    </option>
                                        <option value="05">Maio     </option>
                                        <option value="06">Junho    </option>
                                        <option value="07">Julho    </option>
                                        <option value="08">Agosto   </option>
                                        <option value="09">Setembro </option>
                                        <option value="10">Outubro  </option>
                                        <option value="11">Novembro </option>
                                        <option value="12">Dezembro </option>

                                    </select>	

                                    <select value={ano} name = "Ano" id="ano" >
                                        <option value={ano}> </option>
                                    </select>

                                    <input value={this.state.horaConsulta} id="selecthr" type="time" ></input>

                                    <h4 id="h4" >Especialidade</h4>

                                    <select name="select" class="select" id="select2">
                                        <option value="1">Acupuntura</option>
                                        <option value="2">Anestesiologia</option>
                                        <option value="3">Angiologia</option>
                                        <option value="4">Cardiologia</option>
                                        <option value="5">Cirurgia Cardiovascular</option>
                                        <option value="6">Cirurgia da Mão</option>
                                        <option value="7">Cirurgia do Aparelho Digestivo</option>
                                        <option value="8">Cirurgia Geral</option>
                                        <option value="9">Cirurgia Pediátrica</option>
                                        <option value="10">Cirurgia Plástica</option>
                                        <option value="11">Cirurgia Torácica</option>
                                        <option value="12">Cirurgia Vascular</option>
                                        <option value="13">Dermatologia</option>
                                        <option value="14">Radioterapia</option>
                                        <option value="15">Urologia</option>
                                        <option value="16">Pediatria</option>
                                        <option value="17">Psiquiatria</option>
                                        
                                    </select>

                                    <button type="submit" id="agend" value= "novaconsulta">Agendar</button>
                                </div>   
                            </form>
                        </div>

                    </div>

                    <div>
                        <input id="pes" type="text" placeholder="Nome"></input>
                        <button><div id="lupa"></div></button>    
                    </div>
   
    <tbody>
         {
            this.state.listaConsultas.map((consulta) => {
            return(
                        
                            <div className="coln">
                                    <table className="container">
                                        <div id="rel">
                                            <img  id="icones" src={calendario} alt="icone calendario"/> 
                                            <td id="ps"> {new Date(consulta.dataConsulta).toLocaleDateString()}</td>
                                        </div>

                                        <div id="rel">
                                            <img  id="icones" src={relogio} alt="icone relógio"/> 
                                            <p id="ps">{consulta.horaConsulta}</p>
                                        </div>

                                        <div id="rel">
                                            <img  id="icones" src={paciente} alt="icone paciente"/> 
                                            <p id="pn">{consulta.idPacienteNavigation.nome }</p>
                                        </div>

                                        <div id="rel">
                                            <img  id="icones" src={medico} alt="icone paciente"/> 
                                            <p id="pn">{consulta.idMedicoNavigation.nome  }</p>
                                        </div>

                                        <div id="rel">
                                            <img  id="icones" src={status} alt="icone realizada"/> 
                                            <p id="ps"><td>{consulta.situacao}</td></p>
                                        </div>

                                        <div id="rel">
                                            <img  id="icones" src={especialidade} alt="icone especialidade"/> 
                                            {/* <p id="ps">{consulta.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</p> */}
                                        </div>  
                                    </table>
                            
                                </div>             
                           

                                      
                        );
                    })
                }
            </tbody>
          
        </main>
    </div> 
        
</div>
    
 
        );
    }   
};

export default adm;    
