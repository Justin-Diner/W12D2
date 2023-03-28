class Api::SessionsController < ApplicationController
	#before_action :require_logged_out, only: [:create]
	#before_action :require_logged_in, only: [:destroy]
	
	def show 
		@user = current_user
		if @user 
			render json: {user: @user}
		else 
			render json: { users: nil }
		end
	end

	def create 
			credential = params[:credential]
			password = params[:password]

			@user = User.find_by_credentials(credential, password)

			if @user 
				login!(@user)
				#render 'api/users/show'
				render json: {user: @user}
			else 
				render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
			end
	end

	def destroy
		logout! 
		render json: { message: 'success' }
		#head :no_content
	end

	private
	def session_parms 
		params.require(:session).permit(:credential, :password)
	end
end

# to get CSRF token use res.headers.get('X-CSRF-Token')

# fetch('api/session', {
#		method: "POST"
#		body: JSON.stringify({username: 'madz', password: 'banana'}),
#		headers: {
#		'Content-Type': 'application/json',
#		'X-CSRF-Token: [answer from res.headers.get]
#		}
# })