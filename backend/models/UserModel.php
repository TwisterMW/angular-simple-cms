<?php
    require_once('../db/database-access-layer.php');

    /**
     * @type class
     * @name User
     * @description
     * Clase para la instanciación de un modelo user
     */
    class User{
        var $id;
        var $username;
        var $password;
        var $role;
        var $dbo;

        /**
         * @type method
         * @name __construct
         * @methodOf User
         * @description
         * Método constructor de la clase
         */
        function __construct($username = null, $password = null){
            if($username !== null && $password !== null){
                $this->username = $username;
                $this->password = md5($password);
            }
        }

        /**
         * @type method
         * @name isUser
         * @methodOf User
         * @description
         * Método para comprobar validar un usuario en la database
         */
        function isUser(){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");
            
            $query = "SELECT * FROM users WHERE username = '$this->username' AND password = '$this->password'";
            $res = $this->dbo->query($query);

            if(mysqli_num_rows($res) > 0){
                $r = $res->fetch_assoc();
                $this->dbo->close();

                return array(
                    "id" => $r['id'],
                    "name" => $r['name'],
                    "role" => $r["role"]
                );
            }else{
                $this->dbo->close();
                return false;
            }
        }

        /**
         * @type method
         * @name updateLastConnection
         * @methodOf User
         * @description
         * Método para actualizar la última conexión de usuario
         */
        function updateLastConnection($id){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");
            $date_of_connection = date('Y-m-d');

            $query = "INSERT INTO connections (fk_user, date_of_connection) VALUES (" . $id . ", '$date_of_connection')";
            if($res = $this->dbo->query($query)){
                $this->dbo->close();
                return true;
            }else{
                $this->dbo->close();
                return false;
            }
        }

        /**
         * @type method
         * @name getAllUserConnections
         * @methodOf User
         * @description
         * Método para obtener todas las conexiones de usuario
         */
        function getAllUserConnections(){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");

            $query = "SELECT fk_user, date_of_connection FROM connections";
            $res = $this->dbo->query($query);

            $output = array();
            while($r = $res->fetch_assoc()){
                array_push($output, $r);
            }

            $this->dbo->close();

            return $this->formatUserConnections($output);
        }

        /**
         * @type method
         * @name formatUserConnections
         * @methodOf User
         * @description
         * Método para formatear el objeto de conexiones de usuario
         */
        function formatUserConnections($rawUserConnections){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");

            $formattedList = array();
            foreach($rawUserConnections as $item){
                // Obtenemos el nombre del usuario
                $query = "SELECT name FROM users WHERE id = " . $item['fk_user'];
                $res = $this->dbo->query($query);
                $item['name'] = $res->fetch_row()[0];
                
                array_push($formattedList, $item);
             }

            $this->dbo->close();
            
            return $formattedList;
        }

        /**
         * @type method
         * @name getUserList
         * @methodOf User
         * @description
         * Método para obtener la lista de usuarios de la database
         */
        function getUserList(){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");

            $query = "SELECT id, name, username FROM users";
            $res = $this->dbo->query($query);
            
            $output = array();
            while($r = $res->fetch_assoc()){
                array_push($output, $r);
            }

            $this->dbo->close();

            return $output;
        }

        /**
         * @type method
         * @name addUser
         * @methodOf User
         * @description
         * Método para añadir un usuario a la database
         */
        function addUser($name, $email, $password, $role){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");

            $query = "INSERT INTO users (name, username, password, role) VALUES ('$name', '$email', '$password', " . $role . ")";
            $res = $this->dbo->query($query);

            $this->dbo->close();

            return $res;
        }

        /**
         * @type method
         * @name deleteUser
         * @methodOf User
         * @description
         * Método para borrar un usuario de la database
         */
        function deleteUser($id){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");

            $query = "DELETE FROM users WHERE id = " . $id;
            $res = $this->dbo->query($query);

            if($res){
                $query = "DELETE FROM connections WHERE fk_user = " . $id; 
                $res = $this->dbo->query($query);

                $this->dbo->close();
            }

            return $res;
        }

        /**
         * @type method
         * @name changePwd
         * @methodOf User
         * @description
         * Método para cambiar el password de usuario
         */
        function changePwd($old, $new, $userId){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");
            
            $old = md5($old);
            $new = md5($new);

            $query = "SELECT password FROM users WHERE id = " . $userId;
            $res = $this->dbo->query($query);

            if(mysqli_num_rows($res) > 0){
                if($res->fetch_row()[0] === $old){
                    $query = "UPDATE users SET password = '$new' WHERE id = " . $userId;
                    $res = $this->dbo->query($query);

                    $this->dbo->close();
                    return $res;
                }else{
                    return 'error-old-pwd';
                }
            }else{
                $this->dbo->close();
                return 'error-old-pwd';
            }
        }

        /**
         * @type method
         * @name changeMail
         * @methodOf User
         * @description
         * Método cambiar la dirección de correo principal del usuario
         */
        function changeMail($newMail, $userId){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");

            $query = "UPDATE users SET username = '$newMail' WHERE id = " . $userId;
            $res = $this->dbo->query($query);

            $this->dbo->close();

            return $res;
        }

        /**
         * @type method
         * @name setCookie
         * @methodOf User
         * @description
         * Método para crear la cookie de sesión de usuario
         */
        function setCookie(){
            $cookie_name = "bu-cms-user";
            $cookie_value = $this->username+"-bu-cms";

            setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/", NULL); // 86400 = 1 day
        }
    }
?>