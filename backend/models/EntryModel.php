<?php
    require_once('../db/database-access-layer.php');        

    /**
     * @type class
     * @name Entry
     * @description
     * Clase para la instanciación de un modelo entry
     */
    class Entry{
        var $entryId;
        var $dbo;
        
        /**
         * @type method
         * @name __construct
         * @methodOf Entry
         * @description
         * Método constructor de la clase
         */
        function __construct($id = null, $delete = null){
            if($id !== null){
                if($delete !== null){ if($delete === true) $this->removeEntry($id); }
                else $this->entryId = $id;
            }
        }

        /**
         * @type method
         * @name getAllEntries
         * @methodOf Entry
         * @description
         * Método para obtener todas las entradas publicadas
         */
        function getAllEntries(){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");

            $query = "SELECT * FROM entries";
            $res = $this->dbo->query($query);

            $output = array();
            while($r = $res->fetch_assoc()){
                array_push($output, $r);
            }

            $this->dbo->close();

            return $this->formatEntryList($output);
        }

        /**
         * @type method
         * @name removeEntry
         * @methodOf Entry
         * @description
         * Método para borrar una entrada de la database
         */
        function removeEntry($id){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");

            $query = "DELETE FROM entries WHERE id = " . $id;
            $res = $this->dbo->query($query);

            $this->dbo->close();

            return $res;
        }

        /**
         * @type method
         * @name formatEntryList
         * @methodOf Entry
         * @description
         * Método para serializar y formatear el array con los fk associados
         */
        function formatEntryList($rawList){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");

            $formattedList = array();
            foreach($rawList as $item){
                // Obtenemos el nombre del autor del post
                $query = "SELECT name FROM users WHERE id = " . $item['fk_user'];
                $res = $this->dbo->query($query);
                $item['author'] = $res->fetch_row()[0];

                // Formateamos la fecha a: 'd/m/Y'
                $tempDate = date_create($item['fecha_publicacion']);
                $item['fecha_publicacion'] = date_format($tempDate, 'd/m/Y');

                array_push($formattedList, $item);
            }

            $this->dbo->close();

            return $formattedList;
        }

        /**
         * @type method
         * @name uploadFile
         * @methodOf Entry
         * @description
         * Método para subir un fichero (imagen post)
         */
        function uploadFile($image, $image_url){
            if($image['size'] < 2097152){
                $target_file = '../uploads/' . $image_url;
                $uploaded = move_uploaded_file($image['tmp_name'], $target_file);

                if($uploaded === true){
                    if($image['error'] > 0) return false;
                    else return true;
                }else return "error-image-upload";
            }else return "error-image-size";
        }

        /**
         * @type method
         * @name addEntry
         * @methodOf Entry
         * @description
         * Método para añadir una entrada en la database
         */
        function addEntry($title, $fk_author, $image, $post){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");

            // Detecting publication date
            $fecha_publicacion = date('Y-m-d H:i:s');

            // Making auto-generated short description of the post
            $description = substr(strip_tags($post), 0, 100) . "...";

            // Detecting image name
            $image_url = time() . ".jpg";

            $uploaded = $this->uploadFile($image, $image_url);
            if($uploaded === true){
                $query = "INSERT INTO entries (fecha_publicacion, titulo, description, post, image, fk_user) VALUES ('$fecha_publicacion', '$title', '$description', '$post', '$image_url', " . $fk_author . ")";
                $query = preg_replace("/\r|\n/", "", $query);
                
                if($res = $this->dbo->query($query)){
                    $this->dbo->close();

                    return true;
                }else return false;
            }else echo $uploaded;
        }

        /**
         * @type method
         * @name getEntryById
         * @methodOf Entry
         * @description
         * Método para obtener una entrada por id
         */
        function getEntryById(){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();
            $this->dbo->set_charset("utf8");

            $query = "SELECT * FROM entries WHERE id = " . $this->entryId;
            $res = $this->dbo->query($query);

            if($output = $res->fetch_assoc()){
                $this->dbo->close();

                $this->dbo = $dal->databaseConnect();
                $this->dbo->set_charset("utf8");

                $query = "SELECT name FROM users WHERE id = " . $output['fk_user'];
                
                if($res = $this->dbo->query($query)){
                    $output['author'] = $res->fetch_row()[0];

                    $tempDate = date_create($output['fecha_publicacion']);
                    $output['fecha_publicacion'] = date_format($tempDate, 'd/m/Y H:i');
                    
                    return $output;
                }else return false;
            }else return false;
        }
    }
?>