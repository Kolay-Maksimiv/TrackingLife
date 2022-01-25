using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrackingLife.Data.Domain.AccountBalances;
using TrackingLife.Data.Mapping;

namespace TrackingLife.Data.Configuration
{
    public class AccountBalanceConfig : EntityTypeConfiguration<AccountBalance>
    {
        public override void Configure(EntityTypeBuilder<AccountBalance> builder)
        {
            builder.ToTable("AccountBalance");
            builder.HasIndex(nameof(AccountBalance.UniqueAccount));
            builder.HasIndex(nameof(AccountBalance.CurrentBalance));
            builder.HasIndex(nameof(AccountBalance.LastTransactionDateTime));
        }
    }
}
