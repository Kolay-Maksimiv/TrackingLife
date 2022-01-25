using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrackingLife.Data.Domain.Transactions;
using TrackingLife.Data.Mapping;

namespace TrackingLife.Data.Configuration
{
    public class TransactionConfig : EntityTypeConfiguration<Transaction>
    {
        public override void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.ToTable("Transaction");
            builder.HasIndex(nameof(Transaction.UniqueTransaction));
            builder.HasIndex(nameof(Transaction.CurrentBalance));
            builder.HasIndex(nameof(Transaction.LastTransactionDateTime));

            builder.HasOne(p => p.AccountBalance)
                .WithMany(b => b.Transactions)
                .HasForeignKey(f => f.AccountBalanceId);

            builder.HasOne(p => p.AccountBalance)
                .WithMany(b => b.Transactions)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
