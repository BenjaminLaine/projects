/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   help_functions2.c                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/01/29 15:36:38 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:31:22 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_des(int *len, int *prec, long double *nb, long double num)
{
	if ((*len - 1) < *prec)
	{
		if (num > (long double)-1 && num < (long double)1)
			*len = *prec + 2;
		else
			*len += *prec - 1;
	}
	if (*nb > (long double)18446744073709551615.0)
	{
		num = (num < 0) ? -num : num;
		*len = *prec + 1 + ft_f_count((unsigned long long)num);
	}
	(*nb == 0.500000) ? *len = *prec + 2 : 1;
	((*len - 1) == *prec) ? *len += 1 : 1;
	(*prec == 0) ? *len -= 1 : 1;
}

char	*ft_ftoa(long double num, int prec)
{
	long double	nb;
	char		*str;
	int			len;
	int			neg;

	neg = (num < 0) ? 1 : 0;
	nb = (num < 0) ? -num : num;
	prec = (prec == -1) ? 6 : prec;
	nb = ft_change_prec(prec, nb);
	nb += 0.5000000;
	len = ft_f_count((unsigned long long)nb) + 1;
	ft_des(&len, &prec, &nb, num);
	if (!(str = (char *)ft_strnew(len + neg)))
		return (NULL);
	while ((len-- + neg > 0))
	{
		str[len + neg] = (((unsigned long long)nb % 10) + 48);
		(--prec == 0 && len > neg) ? str[--len + neg] = '.' : 1;
		nb /= 10;
	}
	neg == 1 ? str[0] = '-' : 1;
	return (str);
}

void	ft_putnstr(t_stf *stf, int i, int n)
{
	stf->printed += n;
	write(1, stf->str + i, n);
}

void	ft_putunbr(unsigned long long n)
{
	char				str[20];
	int					z;
	unsigned long long	num;

	z = n < 0 ? 2 : 1;
	num = n < 0 ? -n : n;
	str[0] = z == 2 ? '-' : 1;
	while (((n > 0) || (n < 0)) && (n = n < 0 ? ((n * -1) / 10) : (n / 10)))
		z++;
	str[z] = '\0';
	while ((str[0] == '-' ? z > 1 : z > 0) && (str[--z] = ((num % 10) + 48)))
		num /= 10;
	ft_putstr(str);
}
