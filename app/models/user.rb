class User < ApplicationRecord
	before_validation :ensure_session_token
  has_secure_password
  validates :username, 
    uniqueness: true, 
    length: { in: 3..30 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

	def	self.find_by_credentials(credential, password)
		if credential =~ URI::MailTo::EMAIL_REGEXP
			email = credential
			user = User.find_by(email: email)
		else 
			username = credential 
			user = User.find_by(username: username)
		end

		if user && user.authenticate(password)
			return user 
		else 
			return nil
		end
	end

	def ensure_session_token 
		self.session_token ||= generate_session_token
	end

	def reset_session_token!
		self.session_token = generate_session_token
		self.save!
		self.session_token
	end

	private
	def generate_session_token 
		token = SecureRandom::urlsafe_base64
		while User.exists?(session_token: token)
			token = SecureRandom::urlsafe_base64
		end
		token
	end
	
end
