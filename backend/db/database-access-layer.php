<?php
    
    require_once('db-constants.php');

    /**
     * @type class
     * @name DAL
     * @description
     * Clase para la instanciación de la base de datos SQL
     */
    class DAL{
        var $conn;
        var $errorBuffer;

        /**
         * @type method
         * @name __construct
         * @methodOf DAL
         * @description
         * Método constructor de la clase
         */
        function __construct(){
            $this->conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);

            if(!$this->conn){
                $this->errorBuffer = mysqli_connect_errno();
                return -1;
            }

            $this->conn->close();
        }

        /**
         * @type method
         * @name __construct
         * @methodOf DAL
         * @description
         * Método para devolver una instancia de mysqli
         */
        function databaseConnect(){
            return mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
        }
    }

?>