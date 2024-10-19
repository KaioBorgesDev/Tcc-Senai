using senai_game.DTOs;
using senai_game.Models;
using senai_game.Repositories;

namespace senai_game.Services
{
    public class FavoriteService
    {
        private readonly FavoriteRepository _repository;

        public FavoriteService()
        {
            _repository = new FavoriteRepository();
        }


        public string CreateFavorite(FavoriteDTO favoriteDTO)
        {
            var favorite = new Favorite(favoriteDTO.email_user, favoriteDTO.prova_fav, favoriteDTO.titulo_prova);

            return _repository.insertFavoritos(favorite);
        }

        internal List<Favorite> GetAllFavorites(string email)
        {
            var favorites = _repository.GetAllFavoritosByEmail(email);

            return favorites;
        }

        internal string RemoveFavorito(FavoriteDTO favoritoDTO)
        {
            var favorite = new Favorite(favoritoDTO.email_user, favoritoDTO.prova_fav, favoritoDTO.titulo_prova);
            
            return _repository.removeFavoritos(favorite);

        }
    }
}
