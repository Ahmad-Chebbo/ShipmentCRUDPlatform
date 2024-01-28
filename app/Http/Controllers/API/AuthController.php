<?php

namespace App\Http\Controllers\API;

use Illuminate\Contracts\Auth\Factory as AuthFactory;
use App\Http\Requests\API\RegisterUserRequest;
use App\Http\Requests\API\LoginUserRequest;
use App\Http\Controllers\BaseController;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Exception;

class AuthController extends BaseController
{
    protected AuthFactory $auth;

    public function __construct(AuthFactory $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Register new user
     *
     * @param RegisterUserRequest $request
     * @return JsonResponse
     */
    public function register(RegisterUserRequest $request): JsonResponse
    {
        try {

            $user = User::create($request->except('password') + [
                'password' => bcrypt($request->get('password'))
            ]);

            // Respond with token
            return $this->respondWithToken($user, 'User registered successfully');

        }catch (Exception $ex){
            return $this->responseJsonError('Oops! Something went wrong', $ex->getMessage());
        }
    }

    /**
     * @param LoginUserRequest $request
     * @return JsonResponse
     */
    public function login(LoginUserRequest $request): JsonResponse
    {
        try {

            $credentials = $request->only('email', 'password');
            if (!$this->auth->attempt($credentials)) 
            {
                return $this->responseJsonErrorUnauthorized('Sorry, the information you entered are incorrect. Please try again.');
            }

            // Respond with token
            return $this->respondWithToken($this->auth->user());

        } catch (\Exception $e) {
            return $this->responseJsonErrorInternalServerError('Oops, something went wrong, please try again later',$e->getMessage());
        }
    }

    /**
     * @return JsonResponse
     */
    public function profile(): JsonResponse
    {
        // Retrieve the authenticated user
        $user = $this->auth->user();
        return $this->responseJsonSuccess('Successfully get the authenticated user', $user);
    }

    /**
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        try {

            $user = auth('sanctum')->user();
            $user?->currentAccessToken()?->delete();

            return $this->responseJsonSuccess('Successfully logged out');
        } catch (\Exception $e) {
            return $this->responseJsonErrorInternalServerError('Oops, something went wrong, please try again later',$e->getMessage());
        }
    }
}
