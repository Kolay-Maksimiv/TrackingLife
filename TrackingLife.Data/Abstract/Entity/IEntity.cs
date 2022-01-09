namespace TrackingLife.Data.Abstract.Entity
{
    public interface IEntity
    {

    }

    public interface IEntityBase : IEntity
    {
    }


    public interface IEntity<TEntity> : IEntity
    {
        TEntity Id { get; set; }
    }

    public interface IEntityBase<TEntity> : IEntityBase
    {
        TEntity Id { get; set; }
    }
}
