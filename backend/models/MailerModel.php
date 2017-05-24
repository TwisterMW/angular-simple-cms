<?php
    require_once('../db/database-access-layer.php');
    require_once('../lib/PHPMailer/PHPMailerAutoload.php');
    require_once('../lib/mailer-constants.php');

    /**
     * @type class
     * @name Mailer
     * @description
     * Clase para la instanciación de un modelo mailer
     */
    class Mailer{
        var $name;
        var $userEmail;
        var $mailer;
        var $dbo;

        /**
         * @type method
         * @name __construct
         * @methodOf Mailer
         * @description
         * Método constructor de la clase
         */
        function __construct($address = null){
            $this->mailer = new PHPMailer;

            $this->mailer->isSMTP();
            $this->mailer->Host = SMTP_HOST;
            $this->mailer->SMTPAuth = true;
            $this->mailer->Username = SMTP_USERNAME;
            $this->mailer->Password = SMTP_PASSWORD;
            $this->mailer->SMTPSecure = SMTP_SECURE;
            $this->mailer->Port = SMTP_PORT;
            $this->mailer->Subject = 'Error del gestor de contenidos BrainUpGrup';

            if($address !== null) $this->mailer->addAddress($address);
            else $this->mailer->addAddress('marc@brainupgrup.com');
        }

        /**
         * @type method
         * @name sendEmail
         * @methodOf Mailer
         * @description
         * Método para enviar un mail
         */
        function sendEmail($userId, $message, $subject = null, $image = null){
            $dal = new DAL();
            $this->dbo = $dal->databaseConnect();

            $query = "SELECT name, username FROM users WHERE id = " . $userId;
            $res = $this->dbo->query($query);
            $r = $res->fetch_assoc();

            $this->name = $r['name'];
            $this->userEmail = $r['username'];

            $this->mailer->setFrom($this->userEmail, $this->name);
            $this->mailer->addReplyTo($this->userEmail, $this->name);
            $this->mailer->Body    = 'Error BrainUP CMS (mensaje del usuario): ' . $message;

            if($image !== null){
                $uploaded = $this->uploadImage($image);
                if(!$uploaded) return false;
            }
            
            return ($this->mailer->send()) ? true : $this->mailer->ErrorInfo;
        }


        /**
         * @type method
         * @name uploadImage
         * @methodOf Mailer
         * @description
         * Método para subir una imagen temporalmente para adjuntarla al correo
         */
        function uploadImage($image){
            $target_file = "../uploads/error-image.jpg";
            if(move_uploaded_file($image["tmp_name"], $target_file)){
                $this->mailer->addAttachment('../uploads/error-image.jpg');

                return true;
            }else return false;
        }
    }
?>